import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quiz: null,
    results: [],
    loading: false,
  },
  reducers: {
    setQuizLoading: (state, action) => {
      state.loading = action.payload;
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    setQuizResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

export const { setQuizLoading, setQuiz, setQuizResults } = quizSlice.actions;
export default quizSlice.reducer;
