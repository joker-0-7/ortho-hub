const mongoose = require("mongoose");

const solvedQuestionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  answer: String,
  isCorrect: Boolean,
  solvedAt: { type: Date, default: Date.now },
});

const SolvedQuestion = mongoose.model("SolvedQuestion", solvedQuestionSchema);
module.exports = SolvedQuestion;
