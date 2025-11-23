import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import resumeReducer from "../features/resume/resumeSlice";
import jobReducer from "../features/jobs/jobSlice";
import quizReducer from "../features/quiz/quizSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    resume: resumeReducer,
    jobs: jobReducer,
    quiz: quizReducer,
    dashboard: dashboardReducer,
  },
});
