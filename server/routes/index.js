var express = require("express");
const questionController = require("../controllers/questions.controller");
var router = express.Router();
const path = require("path");
const multer = require("multer");
const { isAdmin, verifyToken } = require("../middlewares/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/tmp"));
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

/* إعدادات الراوتر */
router.get("/", verifyToken, isAdmin, questionController.getQuestionsCount);
router.post(
  "/add-question",
  verifyToken,
  isAdmin,
  upload.array("images"),
  questionController.addQuestion
);
router.delete(
  "/question/:id",
  verifyToken,
  isAdmin,
  questionController.deleteQuestion
);
router.get("/get-question/:id", questionController.getQuestion);
router.patch(
  "/update-question/:id",
  verifyToken,
  isAdmin,
  upload.array("images"),
  questionController.updateQuestion
);
router.get(
  "/get-questions/:current/:per",
  verifyToken,
  isAdmin,
  questionController.getQuestions
);
router.get(
  "/last-questions",
  verifyToken,
  isAdmin,
  questionController.lastQuestions
);

module.exports = router;
