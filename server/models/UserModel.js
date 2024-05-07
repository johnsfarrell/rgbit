const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  key: { type: String, required: true, unique: true },
  balance: { type: Number, required: true },
  refresh: { type: Date, required: true },
});

module.exports = mongoose.model("user", userSchema);
