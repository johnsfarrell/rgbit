const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  key: { type: String, required: true },
  original: { type: Buffer, required: true },
  colored: { type: Buffer, required: true },
});

module.exports = mongoose.model("image", imageSchema);
