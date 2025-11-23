const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  company: String,
  location: String,
  applied: { type: Boolean, default: false },
  saved: { type: Boolean, default: false },
  appliedAt: Date
});

module.exports = mongoose.model("Job", JobSchema);
