import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stats: null,
  latest: null,
  resumes: [],
  jobs: [],       
  loading: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDashboardData: (state, action) => {
      state.stats = action.payload.stats;
      state.latest = action.payload.latest;
      state.resumes = action.payload.resumes;
      state.jobs = action.payload.jobs || []; 
    },
  },
});


export const { setDashboardLoading, setDashboardData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
