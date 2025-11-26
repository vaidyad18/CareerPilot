const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");

const {
  saveJob,
  getMyJobs,
  markApplied,
  searchLinkedInJobs,
} = require("../controllers/jobController");

router.post("/save", auth, saveJob);
router.get("/mine", auth, getMyJobs);
router.post("/apply/:id", auth, markApplied); 
router.get("/search/linkedin", auth, searchLinkedInJobs);




module.exports = router;
