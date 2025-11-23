import api from "../../services/api";
import { setQuizLoading, setQuiz, setQuizResults } from "./quizSlice";

export const generateQuiz = (topic, difficulty) => async (dispatch) => {
  try {
    dispatch(setQuizLoading(true));
    const res = await api.post("/quiz/generate", { topic, difficulty }); // send both
    dispatch(setQuiz(res.data));
  } catch (error) {
    console.error("Quiz generation failed", error);
  } finally {
    dispatch(setQuizLoading(false));
  }
};



export const submitQuiz = (data) => async () => {
  const res = await api.post("/quiz/submit", data);
  return res.data;
};

export const fetchQuizResults = () => async (dispatch) => {
  dispatch(setQuizLoading(true));
  const res = await api.get("/quiz/results");
  dispatch(setQuizResults(res.data));
  dispatch(setQuizLoading(false));
};
