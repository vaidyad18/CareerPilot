import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  myJobs: [],      
  savedJobs: [],
  loading: false,
};


const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setSavedJobs: (state, action) => {
      state.savedJobs = action.payload;
    },
    setMyJobs: (state, action) => {
  state.myJobs = Array.isArray(action.payload) ? action.payload : [];
},

    updateJobStatus: (state, action) => {
      const { id } = action.payload;
      const job = state.myJobs.find((job) => job._id === id);
      if (job) job.applied = true;
    }
  },
});

export const {
  setJobLoading,
  setSearchResults,
  setSavedJobs,
  setMyJobs,
  updateJobStatus
} = jobSlice.actions;

export default jobSlice.reducer;
