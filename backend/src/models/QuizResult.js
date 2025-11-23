const mongoose = require("mongoose");

const QuizResultSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },

    score: Number,
    total: Number,

    answers: [
      {
        question: String,
        selected: Number,
        correctIndex: Number,
      },
    ],

    timeTaken: Number, // in seconds
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizResult", QuizResultSchema);