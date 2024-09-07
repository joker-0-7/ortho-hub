const SolvedQuestion = require("../models/solved.model");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const { CatchAsyncError } = require("../middlewares/CatchAsyncError");
const { ErrorHandler } = require("../utils/ErrorHandler");
const questionModel = require("../models/question.model");
const ContactUs = require("../models/contactUs");

const getUsers = CatchAsyncError(async (req, res, next) => {
  const current = req.params.current || 1;
  const perPage = req.params.per || 10;
  try {
    const users = await userModel
      .find({}, { _id, firstName, lastName, email, isVerified, createdAt })
      .sort({ createdAt: -1 })
      .skip((current - 1) * perPage)
      .limit(perPage)
      .lean();
    if (users.length == 0)
      return next(new ErrorHandler("Not found any users", 400));
    return res.status(200).json(users);
  } catch (error) {
    return next(new ErrorHandler(err.message, 400));
  }
});
const getSolvedCount = CatchAsyncError(async (req, res, next) => {
  try {
    const solvedQuestions = await SolvedQuestion.find({
      userId: req.current.id,
    });
    const solved = solvedQuestions;
    return res.status(200).json({ solved });
  } catch (error) {
    console.error("Error fetching solved questions count:", error);
    return next(new ErrorHandler(err.message, 400));
  }
});
const resetInformation = async (req, res, next) => {
  const id = req.current.id;
  try {
    const user = await userModel.findById(id);
    if (user.isReset) return next(new ErrorHandler("user reset before", 400));
    const question = await SolvedQuestion.find({ userId: id });
    if (question.length == 0)
      return res.status(400).json({ msg: "You Not Have Questions" });
    const delQuestions = await SolvedQuestion.deleteMany({ userId: id });
    user.isReset = true;
    await user.save();
    return res.status(200).json({ msg: "Your Information Was Rested" });
  } catch (error) {
    console.log(error);
  }
};
const updatePassword = async (req, res) => {
  const id = req.current.id;
  const password = req.body.password;
  if (!password) return res.status(404).json({ msg: "password required" });
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await userModel.findByIdAndUpdate(id, { password: hash });
    return res.status(200).json({ msg: "Done Change Password" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "failed" });
  }
};
const getUsersCount = CatchAsyncError(async (req, res, next) => {
  try {
    const count = await userModel.countDocuments();
    return res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching questions count:", error);
    return next(new ErrorHandler(error.message, 400));
  }
});
const changeStatus = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const status = req.body.status;

  try {
    const user = await userModel.findById(id);
    if (user) {
      user.isVerified = !status;
      if (!status) {
        user.subscriptionEnd = new Date();
        user.subscriptionEnd.setMonth(user.subscriptionEnd.getMonth() + 3);
      }
      await user.save();
      return res.status(200).json({ msg: "success" });
    }
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});
const search = CatchAsyncError(async (req, res, next) => {
  const query = req.params.query;
  if (!query) return;
  try {
    const users = await userModel
      .find({
        $or: [
          { firstName: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
          { lastName: { $regex: query, $options: "i" } },
        ],
      })
      .limit(5);
    const questions = await questionModel
      .find({
        $or: [
          { question: { $regex: query, $options: "i" } },
          { explanation: { $regex: query, $options: "i" } },
        ],
      })
      .limit(5);
    const results = [...users, ...questions];
    return res.status(200).json(results);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});
const getUser = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    return next(new ErrorHandler(err.message, 400));
  }
});
const updateUser = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const data = { ...req.body };

  try {
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }
    if (data.activationTo) {
      const startDate = new Date(data.createdAt || Date.now());
      const subscriptionEnd = new Date(startDate);
      subscriptionEnd.setMonth(
        subscriptionEnd.getMonth() + parseInt(data.activationTo)
      );
      data.subscriptionEnd = subscriptionEnd;
    }
    const user = await userModel.findByIdAndUpdate(id, data, { new: true });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});
const deleteUser = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  try {
    await userModel.findByIdAndDelete(id);
    return res.status(200).json({ success: true });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
const getActiveUserCount = CatchAsyncError(async (req, res, next) => {
  try {
    const count = await userModel.countDocuments({ isVerified: true });
    return res.status(200).json({ count });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
const contactUs = CatchAsyncError(async (req, res, next) => {
  try {
    const { name, email, message, subject } = req.body;
    if (!name || !email || !message)
      return next(new ErrorHandler("You Should Add All Information", 400));
    const contact = new ContactUs({ name, email, message, subject });
    await contact.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
const contactUsCount = CatchAsyncError(async (req, res, next) => {
  try {
    const count = await ContactUs.countDocuments();
    return res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching questions count:", error);
    return next(new ErrorHandler(err.message, 400));
  }
});
const getAllContactUs = CatchAsyncError(async (req, res, next) => {
  const current = req.params.current || 1;
  const perPage = req.params.per || 10;
  try {
    const message = await ContactUs.find()
      .sort({ createdAt: -1 })
      .skip((current - 1) * perPage)
      .limit(perPage)
      .lean();
    return res.status(200).json(message);
  } catch (error) {
    return next(new ErrorHandler(err.message, 400));
  }
});
const contactUsOne = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  try {
    const message = await ContactUs.findById(id);
    if (!message) return next(new ErrorHandler("Not found any message", 400));
    return res.status(200).json(message);
  } catch (error) {
    return next(new ErrorHandler(err.message, 400));
  }
});
const deleteMessage = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  try {
    const message = await ContactUs.findByIdAndDelete(id);
    if (!message) return next(new ErrorHandler("Not found any message", 400));
    return res.status(200).json(message);
  } catch (error) {
    return next(new ErrorHandler(err.message, 400));
  }
});
module.exports = {
  resetInformation,
  updatePassword,
  getUsers,
  getSolvedCount,
  getUsersCount,
  changeStatus,
  search,
  getUser,
  updateUser,
  deleteUser,
  getActiveUserCount,
  contactUs,
  contactUsCount,
  getAllContactUs,
  contactUsOne,
  deleteMessage,
};
