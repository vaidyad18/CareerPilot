const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answerIndex: Number,
});

const QuizSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    topic: String,
    difficulty: { type: String, default: "easy" },  
    questions: [QuestionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", QuizSchema);
