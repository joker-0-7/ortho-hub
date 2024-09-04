var express = require("express");
const questionController = require("../controllers/questions.controller");
const multer = require("multer");
var router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    const mimetype = file.mimetype.split("/")[1];
    const uniqueSuffix = `question-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}.${mimetype}`;
    if (!req.fileNames) req.fileNames = [];
    req.fileNames.push(uniqueSuffix);
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
/* GET home page. */
router.get("/", questionController.getQuestionsCount);
router.post(
  "/add-question",
  upload.array("images"),
  questionController.addQuestion
);
router.delete("/question/:id", questionController.deleteQuestion);
// router.get("/get-user-questions", questionController.getUserQuestion);
router.get("/get-question/:id", questionController.getQuestion);
router.patch(
  "/update-question/:id",
  upload.single("img"),
  questionController.updateQuestion
);
router.get("/get-questions/:current/:per", questionController.getQuestions);
router.get("/last-questions", questionController.lastQuestions);

module.exports = router;
