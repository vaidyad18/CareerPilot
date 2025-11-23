const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  start: String,
  end: String,
  description: String,
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  link: String,
  desc: String,
});

const EducationSchema = new mongoose.Schema({
  school: String,
  degree: String,
  start: String,
  end: String,
});

const ResumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    title: String,
    role: String,
    contact: String,
    address: String,
    summary: String,

    skills: [String],
    experience: [ExperienceSchema],
    projects: [ProjectSchema],
    education: [EducationSchema],

    links: {
      linkedin: String,
      github: String,
      portfolio: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", ResumeSchema);
