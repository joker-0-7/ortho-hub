const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const SubjectModal = mongoose.model("Subject", subjectSchema);
module.exports = SubjectModal;
