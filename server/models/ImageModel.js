const mongoose = require("mongoose");
const { FILE_EXPIRATION } = require("../config/const");

const imageSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  key: { type: String, required: true },
  colored: { type: Buffer, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: FILE_EXPIRATION }
  }
});

module.exports = mongoose.model("image", imageSchema);
