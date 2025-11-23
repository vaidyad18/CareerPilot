const Resume = require("../models/Resume");

// CREATE resume
exports.createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      userId: req.user._id,
      ...req.body,
    });

    res.json({ message: "Resume created", resume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create resume" });
  }
};

// GET all resumes for user
exports.getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch resumes" });
  }
};

// GET single resume
exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) return res.status(404).json({ message: "Resume not found" });

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// DELETE resume
exports.deleteResume = async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: "Resume deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

