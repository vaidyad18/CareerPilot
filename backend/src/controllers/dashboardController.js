const Resume = require("../models/Resume");
const Job = require("../models/Job");
const QuizResult = require("../models/QuizResult");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    const resumes = await Resume.find({ userId }).sort({ createdAt: -1 });
    const jobs = await Job.find({ userId }).sort({ createdAt: -1 });

    const quizHistory = await QuizResult.find({ userId })
      .populate("quizId")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      stats: {
        resumeCount: resumes.length,
        savedJobsCount: jobs.filter((j) => j.saved === true).length,
        appliedJobsCount: jobs.filter((j) => j.applied === true).length,
        quizAttemptsCount: quizHistory.length,
      },

      latest: {
        resume: resumes[0] || null,
        job: jobs[0] || null,
        quiz: quizHistory[0] || null,
        quizHistory,
      },

      resumes,
      jobs, // FIXED
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Dashboard load error" });
  }
};
