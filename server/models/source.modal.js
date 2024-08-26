const mongoose = require("mongoose");

const sourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const SourceModal = mongoose.model("Source", sourceSchema);
module.exports = SourceModal;
