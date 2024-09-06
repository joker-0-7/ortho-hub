const { CatchAsyncError } = require("../middlewares/CatchAsyncError");
const questionModel = require("../models/question.model");
const SolvedQuestion = require("../models/solved.model");
const SourceModal = require("../models/source.modal");
const SubjectModal = require("../models/subject.modal");
const userModel = require("../models/user.model");
const { ErrorHandler } = require("../utils/ErrorHandler");
const path = require("path");
const fs = require("fs");
const getQuestionsCount = CatchAsyncError(async (req, res, next) => {
  try {
    if (req?.current?.type === "free") {
      const count = await questionModel.countDocuments({ isFree: true });
      return res.status(200).json({ count });
    }
    const count = await questionModel.countDocuments();
    return res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching questions count:", error);
    return next(new ErrorHandler(err.message, 400));
  }
});
const createExam = CatchAsyncError(async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.current.id;
    const solvedQuestions = await SolvedQuestion.find({ userId: id });
    const solvedQuestionIds = solvedQuestions.map(
      (solvedQuestion) => solvedQuestion.questionId
    );
    let correctQuestions = [];
    let incorrectQuestions = [];
    let unusedQuestions = [];

    let query = {
      sources: { $in: data.sources },
      subjects: { $in: data.subjects },
    };
    if (req?.current?.type === "free") {
      const exam = await questionModel.aggregate([
        { $match: { isFree: true } },
        { $sample: { size: data.count || 100 } },
      ]);
      return res.status(200).json(exam);
    } else {
      if (data.options.useAndCorrect) {
        const correctSolvedQuestions = await SolvedQuestion.find({
          userId: id,
          isCorrect: true,
        })
          .populate({
            path: "questionId",
            match: query,
          })
          .exec();
        correctQuestions = correctSolvedQuestions
          .filter((sq) => sq.questionId !== null)
          .map((sq) => sq.questionId);
      }
      if (data.options.useAndInCorrect) {
        const incorrectSolvedQuestions = await SolvedQuestion.find({
          userId: id,
          isCorrect: false,
        })
          .populate({
            path: "questionId",
            match: query,
          })
          .exec();

        incorrectQuestions = incorrectSolvedQuestions
          .filter((sq) => sq.questionId !== null)
          .map((sq) => sq.questionId);
      }
      if (data.options.unUsed) {
        unusedQuestions = await questionModel.find({
          ...query,
          _id: { $nin: solvedQuestionIds },
        });
      }
    }
    let allQuestions = [
      ...correctQuestions,
      ...incorrectQuestions,
      ...unusedQuestions,
    ];
    if (allQuestions.length === 0) {
      allQuestions = await questionModel.aggregate([
        { $match: query },
        { $sample: { size: data.count || 100 } },
      ]);
    } else {
      allQuestions = allQuestions
        .sort(() => 0.5 - Math.random())
        .slice(0, data.count || allQuestions.length);
    }

    return res.status(200).json(allQuestions);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const getQuestion = CatchAsyncError(async (req, res, next) => {
  try {
    const question = await questionModel.findById(req.params.id).exec();
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    return res.status(200).json(question);
  } catch (error) {
    console.log(error);

    return next(new ErrorHandler(error.message, 400));
  }
});
const getQuestions = async (req, res) => {
  const current = req.params.current || 1;
  const perPage = req.params.per || 10;
  try {
    const quizzes = await questionModel
      .find()
      .sort({ createdAt: -1 })
      .skip((current - 1) * perPage)
      .limit(perPage)
      .lean();
    return res.status(200).json(quizzes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const addQuestion = CatchAsyncError(async (req, res, next) => {
  try {
    const data = req.body;
    const question = new questionModel({
      sources: JSON.parse(data.sources) || [],
      question: data.question,
      answers: JSON.parse(data.answers) || [],
      correct: data.correct,
      explanation: data.explanation,
      isFree: data.isFree,
      subjects: JSON.parse(data.subjects) || [],
      images: [],
    });
    await question.save();
    const questionId = question._id.toString();
    const uploadPath = path.join(
      __dirname,
      `../uploads/questions/${questionId}`
    );
    if (req.fileNames?.length >= 1) {
      fs.mkdirSync(uploadPath, { recursive: true });

      req.fileNames.forEach((fileName) => {
        const newFileName = fileName;
        fs.renameSync(
          path.join(__dirname, `../uploads/tmp/${fileName}`),
          path.join(uploadPath, newFileName)
        );
      });
      question.images = req.fileNames;
    }
    await question.save();

    return res.status(201).json({ msg: "Done Create Exam" });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const updateQuestion = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  const question = await questionModel.findById(id);

  try {
    question.sources = JSON.parse(data.sources) || [];
    question.question = data.question || "";
    question.answers = JSON.parse(data.answers) || [];
    question.correct = data.correct || "";
    question.explanation = data.explanation || "";
    question.isFree = data.isFree;
    question.subjects = JSON.parse(data.subjects) || [];

    if (req.fileNames) {
      const questionId = question._id.toString();
      const uploadPath = path.join(
        __dirname,
        `../uploads/questions/${questionId}`
      );
      fs.mkdirSync(uploadPath, { recursive: true });

      req.fileNames.forEach((fileName) => {
        const newFileName = fileName;
        fs.renameSync(
          path.join(__dirname, `../uploads/tmp/${fileName}`),
          path.join(uploadPath, newFileName)
        );
      });

      question.images = req.fileNames;
    }

    await question.save();
    return res.status(200).json({ msg: "Done Update Exam" });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

// sources
const addSource = CatchAsyncError(async (req, res, next) => {
  const data = req.body.source;
  if (!data || !data.name)
    return res.status(404).json({ msg: "You Should Add Subject Name" });
  try {
    const source = await SourceModal(data);
    source.save();
    return res.status(201).json({ msg: "Done Created" });
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
});
const getSources = CatchAsyncError(async (req, res, next) => {
  try {
    const sources = await SourceModal.find().lean();
    return res.status(200).json(sources);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
const getSource = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  try {
    const subject = await SourceModal.findById(id);
    return res.status(201).json(subject);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
const updateSource = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  console.log(data);
  try {
    const subject = await SourceModal.findByIdAndUpdate(
      id,
      { name: data.name },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, msg: "Done updated subject", subject });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
const deleteSources = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  try {
    const subject = await SourceModal.findByIdAndDelete(id);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});
// Subjects
const getSubjectCount = CatchAsyncError(async (req, res, next) => {
  try {
    const count = await SubjectModal.countDocuments();
    return res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching questions count:", error);
    return next(new ErrorHandler(err.message, 400));
  }
});
const addSubject = CatchAsyncError(async (req, res, next) => {
  const data = req.body;
  console.log(data);
  if (!data || !data.name)
    return res
      .status(404)
      .json({ msg: "You Should Add Subject Name", success: false });
  try {
    const subject = await SubjectModal(data);
    subject.save();
    return res.status(201).json({ msg: "Done Created", success: true });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
const getSubjects = CatchAsyncError(async (req, res, next) => {
  try {
    const subjects = await SubjectModal.find().lean();
    return res.status(200).json(subjects);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
const getSubject = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  try {
    const subject = await SubjectModal.findById(id);
    return res.status(201).json(subject);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
const updateSubject = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  console.log(data);
  try {
    const subject = await SubjectModal.findByIdAndUpdate(
      id,
      { name: data.name },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, msg: "Done updated subject", subject });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
const deleteSubject = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  try {
    const subject = await SubjectModal.findByIdAndDelete(id);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});
const submitExam = CatchAsyncError(async (req, res, next) => {
  if (req.current.type === "free")
    return res.status(200).json({ success: true });

  try {
    const { userId, solvedQuestions } = req.body;

    if (!userId || !Array.isArray(solvedQuestions)) {
      return res.status(400).json({ error: "Invalid input data" });
    }
    await Promise.all(
      solvedQuestions.map(async (sq) => {
        await SolvedQuestion.findOneAndUpdate(
          { userId: userId, questionId: sq.quizId },
          {
            userId: userId,
            questionId: sq.quizId,
            answer: sq.userAnswer,
            isCorrect: sq.isCorrect,
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      })
    );

    res
      .status(200)
      .json({ success: true, message: "Exam submitted successfully" });
  } catch (error) {
    console.error("Error submitting exam:", error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const previousQuestions = CatchAsyncError(async (req, res, next) => {
  const id = req.current.id;
  const type = req.params.type;
  const current = req.params.current || 1;
  const perPage = req.params.per || 10;
  try {
    if (type === "correct") {
      const previousQuestions = await SolvedQuestion.find({
        userId: id,
        isCorrect: true,
      })
        .sort({ createdAt: -1 })
        .populate("questionId")
        .skip((current - 1) * perPage)
        .limit(perPage)
        .lean()
        .exec();
      return res.status(200).json(previousQuestions);
    } else if (type === "incorrect") {
      const previousQuestions = await SolvedQuestion.find({
        userId: id,
        isCorrect: false,
      })
        .sort({ createdAt: -1 })
        .skip((current - 1) * perPage)
        .limit(perPage)
        .lean()
        .populate("questionId")
        .exec();
      return res.status(200).json(previousQuestions);
    } else {
      const previousQuestions = await SolvedQuestion.find({
        userId: id,
      })
        .sort({ createdAt: -1 })
        .skip((current - 1) * perPage)
        .limit(perPage)
        .lean()
        .populate("questionId");
      if (previousQuestions.length > 0)
        return res.status(200).json(previousQuestions);
      return next(new ErrorHandler("Error", 400));
    }
  } catch (error) {
    console.log(error);

    return next(new ErrorHandler(error.message, 400));
  }
});
const previousQuestion = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);

  try {
    const prev = await SolvedQuestion.findOne({ questionId: id }).populate(
      "questionId"
    );
    if (prev) return res.status(200).json(prev);
    return next(new ErrorHandler("Error", 400));
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});
const lastUsers = CatchAsyncError(async (req, res, next) => {
  try {
    const last = await userModel.find().sort({ createdAt: -1 }).limit(5);
    if (last) return res.status(200).json(last);
    return next(new ErrorHandler("Error", 400));
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(error.message, 400));
  }
});
const lastQuestions = CatchAsyncError(async (req, res, next) => {
  try {
    const last = await questionModel.find().sort({ createdAt: -1 }).limit(5);
    if (last) return res.status(200).json(last);
    return next(new ErrorHandler("Error", 400));
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});
const deleteQuestion = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const folderPath = path.join(__dirname, "../uploads/questions", id);

  try {
    const question = await questionModel.findById(id);

    if (!question) {
      return next(new ErrorHandler("Question not found", 404));
    }
    if (fs.existsSync(folderPath)) {
      fs.readdir(folderPath, (err, files) => {
        if (err) {
          console.error(`Error reading folder: ${err.message}`);
          return next(new ErrorHandler("Error reading folder", 500));
        }
        files.forEach((file) => {
          const filePath = path.join(folderPath, file);
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error deleting file: ${err.message}`);
            } else {
              console.log(`File deleted: ${filePath}`);
            }
          });
        });
        fs.rmdir(folderPath, (err) => {
          if (err) {
            console.error(`Error deleting folder: ${err.message}`);
            return next(new ErrorHandler("Error deleting folder", 500));
          } else {
            console.log(`Folder deleted: ${folderPath}`);
          }
        });
      });
    }
    await questionModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Question and associated images deleted successfully" });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  getQuestionsCount,
  createExam,
  addSource,
  getSources,
  getSource,
  updateSource,
  getSubjects,
  addSubject,
  getSubject,
  updateSubject,
  submitExam,
  previousQuestions,
  previousQuestion,
  lastQuestions,
  lastUsers,
  getSubjectCount,
  getQuestions,
  addQuestion,
  deleteQuestion,
  getQuestion,
  updateQuestion,
  deleteSubject,
  deleteSources,
};
