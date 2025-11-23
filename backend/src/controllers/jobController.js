const axios = require("axios");
const Job = require("../models/Job");

// SAVE JOB
// SAVE JOB
const saveJob = async (req, res) => {
  try {
    await Job.create({
      userId: req.user._id,
      ...req.body,
      applied: false,
      saved: true,
    });

    const jobs = await Job.find({ userId: req.user._id });
    res.json(jobs);  // return array only
  } catch (err) {
    console.error("Save Job Error:", err);
    res.status(500).json({ message: "Failed to save job" });
  }
};


// GET SAVED JOBS
const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id });
    res.json(jobs);

  } catch (err) {
    console.error("Get Jobs Error:", err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

// MARK APPLIED
const markApplied = async (req, res) => {
  try {
    await Job.findByIdAndUpdate(req.params.id, {
  applied: true,
  appliedAt: new Date(),
});


    const jobs = await Job.find({ user: req.user.id });
    res.json({ jobs });
  } catch (err) {
    console.error("Apply Job Error:", err);
    res.status(500).json({ message: "Failed to update job" });
  }
};

// SEARCH LINKEDIN JOBS with pagination
const searchLinkedInJobs = async (req, res) => {
  try {
    const query = req.query.query;

    const response = await axios.get(
      "https://linkedin-job-search-api.p.rapidapi.com/active-jb-24h",
      {
        params: {
          limit: "10",
          offset: "0",
          title_filter: `"${query}"`,
          description_type: "text",
        },
        headers: {
          "x-rapidapi-key": process.env.RAPID_API_KEY,
          "x-rapidapi-host": process.env.RAPID_API_LINKEDIN_HOST,
        },
      }
    );

    console.log("API RESPONSE OK");
    res.json({ jobs: response.data });

  } catch (error) {
    console.log("LinkedIn Fetch Error:", error.response?.data || error.message);
    res.status(500).json({ message: "LinkedIn fetch failed" });
  }
};


module.exports = {
  saveJob,
  getMyJobs,
  markApplied,
  searchLinkedInJobs,
};
