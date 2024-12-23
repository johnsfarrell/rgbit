const mongoose = require("mongoose");

const imageLogSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  key: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("imageLog", imageLogSchema);
