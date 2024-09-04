const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuestionSchema = new Schema(
  {
    sources: { type: Array, required: true },
    subjects: { type: Array, required: true },
    answers: { type: Array, required: true },
    question: { type: String, required: true },
    correct: { type: String, required: true },
    images: { type: Array },
    explanation: { type: String },
    isFree: { type: Boolean },
  },
  { timestamps: true }
);
const questionModel = mongoose.model("Question", QuestionSchema);
module.exports = questionModel;
