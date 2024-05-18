const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  key: { type: String, required: true },
  colored: { type: Buffer, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: 60 * 30 } },
});

module.exports = mongoose.model("image", imageSchema);
