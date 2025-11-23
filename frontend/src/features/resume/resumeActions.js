import api from "../../services/api";
import {
  setResumeLoading,
  setResumes,
  addResume,
} from "./resumeSlice";

// CREATE RESUME
export const createResume = (data) => async (dispatch) => {
  try {
    dispatch(setResumeLoading(true));
    const res = await api.post("/resumes", data);
    dispatch(addResume(res.data.resume));
  } catch (error) {
    alert("Failed to create resume");
    console.error(error);
  } finally {
    dispatch(setResumeLoading(false));
  }
};
// GET USER RESUMES
export const fetchMyResumes = () => async (dispatch) => {
  try {
    dispatch(setResumeLoading(true));
    const res = await api.get("/resumes");
    dispatch(setResumes(res.data));
  } catch (error) {
    alert("Failed to fetch resumes");    console.error(error);

  } finally {
    dispatch(setResumeLoading(false));
  }
};

// GENERATE AI SUMMARY
export const generateSummary = (data, setSummary) => async () => {
  try {
    const res = await api.post("/resumes/generate/summary", data);
    setSummary(res.data.summary);
  } catch (error) {
    alert("AI Summary generation failed");    console.error(error);

  }
};


