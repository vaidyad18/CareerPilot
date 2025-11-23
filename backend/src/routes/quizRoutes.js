const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");

const {
  generateQuiz,
  submitQuiz,
  getMyQuizResults
} = require("../controllers/quizController");

// MUST pass functions only
router.post("/generate", auth, generateQuiz);
router.post("/submit", auth, submitQuiz);
router.get("/results", auth, getMyQuizResults);

module.exports = router;
