import { createSlice } from "@reduxjs/toolkit";

const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    resumes: [],
    loading: false,
  },
  reducers: {
    setResumeLoading: (state, action) => {
      state.loading = action.payload;
    },
    setResumes: (state, action) => {
      state.resumes = action.payload;
    },
    addResume: (state, action) => {
      state.resumes.push(action.payload);
    },
  },
});

export const { setResumeLoading, setResumes, addResume } =
  resumeSlice.actions;

export default resumeSlice.reducer;
