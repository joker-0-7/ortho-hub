var express = require("express");
const questionController = require("../controllers/questions.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth");
var router = express.Router();

router.post("/source", verifyToken, isAdmin, questionController.addSource);
router.get("/sources", questionController.getSources);
router.get("/source/:id", verifyToken, isAdmin, questionController.getSource);
router.patch(
  "/source/:id",
  verifyToken,
  isAdmin,
  questionController.updateSource
);
router.delete(
  "/source/:id",
  verifyToken,
  isAdmin,
  questionController.deleteSources
);
router.post("/subject", verifyToken, isAdmin, questionController.addSubject);
router.get(
  "/subjects-count",
  verifyToken,
  isAdmin,
  questionController.getSubjectCount
);
router.get("/subjects", questionController.getSubjects);
router.get("/subject/:id", verifyToken, isAdmin, questionController.getSubject);
router.patch(
  "/subject/:id",
  verifyToken,
  isAdmin,
  questionController.updateSubject
);
router.delete(
  "/subject/:id",
  verifyToken,
  isAdmin,
  questionController.deleteSubject
);
router.post("/create-exam", verifyToken, questionController.createExam);
router.post("/submit-exam", verifyToken, questionController.submitExam);

module.exports = router;
