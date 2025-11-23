import axios from "axios";
import api from "../../services/api";
import { setJobLoading, setSearchResults, setSavedJobs, setMyJobs, updateJobStatus } from "./jobSlice";

// SEARCH JOBS USING JSEARCH API
export const searchJobsLinkedIn = (query) => async (dispatch) => {
  try {
    dispatch(setJobLoading(true));
    const res = await api.get(`/jobs/search/linkedin?query=${query}`);
    dispatch(setSearchResults(res.data.jobs));
  } catch (err) {
    console.error(err);
    alert("LinkedIn fetch failed");
  } finally {
    dispatch(setJobLoading(false));
  }
};



export const getMyJobs = () => async (dispatch) => {
  try {
    dispatch(setJobLoading(true));
    const res = await api.get("/jobs/mine");
    dispatch(setMyJobs(res.data)); // now res.data is array

  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setJobLoading(false));
  }
};

export const saveJob = (jobData) => async (dispatch) => {
  try {
    const res = await api.post("/jobs/save", jobData);
    dispatch(setMyJobs(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const applyJob = (id) => async (dispatch) => {
  try {
    await api.post(`/jobs/apply/${id}`);
    dispatch(updateJobStatus({ id }));
  } catch (error) {
    console.log(error);
  }
};

