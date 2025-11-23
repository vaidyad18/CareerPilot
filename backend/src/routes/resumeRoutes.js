const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  createResume,
  getMyResumes,
  getResumeById,
  deleteResume,
  generateAISummary,
} = require("../controllers/resumeController");

router.post("/", auth, createResume);
router.get("/", auth, getMyResumes);

router.get("/:id", auth, getResumeById);
router.delete("/:id", auth, deleteResume);

module.exports = router;
