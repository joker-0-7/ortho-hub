var express = require("express");
const questionController = require("../controllers/questions.controller");
const { verifyToken } = require("../middlewares/auth");
var router = express.Router();

router.post("/source", questionController.addSource);
router.get("/sources", questionController.getSources);
router.get("/source/:id", questionController.getSource);
router.patch("/source/:id", questionController.updateSource);
router.delete("/source/:id", questionController.deleteSources);
router.post("/subject", questionController.addSubject);
router.get("/subjects-count", questionController.getSubjectCount);
router.get("/subjects", questionController.getSubjects);
router.get("/subject/:id", questionController.getSubject);
router.patch("/subject/:id", questionController.updateSubject);
router.delete("/subject/:id", questionController.deleteSubject);
router.post("/create-exam", verifyToken, questionController.createExam);
router.post("/submit-exam", verifyToken, questionController.submitExam);

module.exports = router;
