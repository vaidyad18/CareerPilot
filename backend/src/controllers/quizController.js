const Quiz = require("../models/Quiz");
const QuizResult = require("../models/QuizResult");
const { generateMCQsWithGemini } = require("../utils/geminiQuizGenerator");

// ====================== GENERATE QUIZ ======================
exports.generateQuiz = async (req, res) => {
  try {
    const { topic, difficulty } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    // Generate Questions from Gemini
    const questions = await generateMCQsWithGemini(topic, difficulty);

    const quiz = await Quiz.create({
      userId: req.user._id,
      topic,
      difficulty,
      questions,
    });

    return res.json(quiz);
  } catch (error) {
    console.error("Generate quiz error:", error);
    return res.status(500).json({ message: "Quiz generation failed" });
  }
};

// ====================== SUBMIT QUIZ ======================
exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, answers, timeTaken } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;

    const detailedAnswers = quiz.questions.map((q, i) => {
      if (answers[i] === q.answerIndex) score++;

      return {
        question: q.question,
        selected: answers[i] ?? -1,
        correctIndex: q.answerIndex,
      };
    });

    const result = await QuizResult.create({
      userId: req.user._id,
      quizId,
      score,
      total: quiz.questions.length,
      answers: detailedAnswers,
      timeTaken,
    });

    res.json({
      message: "Quiz submitted",
      score,
      total: quiz.questions.length,
      resultId: result._id,
    });
  } catch (error) {
    console.error("Submit quiz error:", error);
    res.status(500).json({ message: "Quiz submission failed" });
  }
};


// ====================== GET QUIZ HISTORY ======================
exports.getMyQuizResults = async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.user._id })
      .populate("quizId")
      .sort({ createdAt: -1 });

    return res.json(results);
  } catch (error) {
    console.error("Fetch quiz history error:", error);
    return res.status(500).json({ message: "Unable to fetch quiz results" });
  }
};
