import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { generateQuiz, submitQuiz } from "../features/quiz/quizActions";

const Quiz = () => {
  const dispatch = useDispatch();
  const { quiz } = useSelector((state) => state.quiz);

  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [mode, setMode] = useState("select");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(20);
  const [showScore, setShowScore] = useState(false);
  const [finalScore, setFinalScore] = useState(null);
  const [detailedAnswers, setDetailedAnswers] = useState([]);

  const startQuiz = async () => {
    if (!topic.trim()) return alert("Enter a topic");
    setMode("loading");
    await dispatch(generateQuiz(topic, difficulty));
    setMode("quiz");
    setIndex(0);
    setAnswers([]);
    setTimer(20);
  };

  const nextQuestion = useCallback(() => {
    if (index < quiz.questions.length - 1) {
      setIndex((prev) => prev + 1);
      setTimer(20);
    } else {
      finishQuiz();
    }
  }, [index, quiz]);

  const finishQuiz = async () => {
    const res = await dispatch(
      submitQuiz({
        quizId: quiz._id,
        answers,
        timeTaken: quiz.questions.length * 20 - timer,
      })
    );

    setFinalScore({ score: res.score, total: res.total });

    setDetailedAnswers(
      quiz.questions.map((q, i) => ({
        question: q.question,
        selected: answers[i],
        correctIndex: q.answerIndex,
        options: q.options,
      }))
    );

    setShowScore(true);
    setMode("score");
  };

  useEffect(() => {
    if (mode !== "quiz") return;
    if (timer === 0) {
      setTimeout(() => nextQuestion(), 0);
      return;
    }
    const t = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, mode, nextQuestion]);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900 text-gray-100">
      <Navbar />

      <div className="flex flex-col items-center px-6 py-10">
        <h2 className="text-4xl font-extrabold mb-8 bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          AI Quiz Generator
        </h2>

        {mode === "select" && (
          <div className="backdrop-blur-xl bg-white/10 border border-white/10 shadow-xl rounded-2xl p-8 w-full max-w-md">
            <input
              type="text"
              placeholder="Topic (React, C++, DSA)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-gray-800/60 border border-white/10 rounded-xl px-4 py-3 text-gray-100 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <select
              className="w-full bg-gray-800/60 border border-white/10 rounded-xl px-4 py-3 text-gray-100 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option className="bg-gray-900" value="easy">Easy</option>
              <option className="bg-gray-900" value="medium">Medium</option>
              <option className="bg-gray-900" value="hard">Hard</option>
            </select>

            <button
              onClick={startQuiz}
              className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium hover:opacity-90 transition"
            >
              Generate Quiz
            </button>
          </div>
        )}

        {mode === "loading" && (
          <p className="text-blue-400 font-semibold text-lg mt-8 animate-pulse">
            Generating quiz, please wait...
          </p>
        )}

        {mode === "quiz" && !showScore && quiz && (
          <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl p-8 shadow-xl w-full max-w-3xl mt-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">
                Question {index + 1} / {quiz.questions.length}
              </h3>
              <p className="text-red-400 font-bold text-xl animate-pulse">
                ⏳ {timer}s
              </p>
            </div>

            <p className="text-lg font-medium mb-6">{quiz.questions[index].question}</p>

            <div className="space-y-3">
              {quiz.questions[index].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const upd = [...answers];
                    upd[index] = i;
                    setAnswers(upd);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition 
                  ${
                    answers[index] === i
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800/50 border border-white/10 hover:bg-gray-700"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <button
              onClick={nextQuestion}
              className="w-full py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition mt-6"
            >
              {index === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
            </button>
          </div>
        )}

        {mode === "score" && showScore && (
          <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl p-8 shadow-xl w-full max-w-4xl mt-6">
            <h3 className="text-3xl font-bold mb-6 text-center">
              Score: {finalScore.score} / {finalScore.total}
            </h3>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {detailedAnswers.map((ans, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-800/40 border border-white/10">
                  <p className="font-semibold mb-3">{ans.question}</p>

                  {ans.options.map((opt, idx) => (
                    <p
                      key={idx}
                      className={`ml-3 ${
                        idx === ans.correctIndex
                          ? "text-green-400 font-semibold"
                          : ans.selected === idx
                          ? "text-red-400 font-semibold"
                          : "text-gray-300"
                      }`}
                    >
                      • {opt}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setMode("select");
                setShowScore(false);
              }}
              className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium hover:opacity-90 transition mt-6"
            >
              Back to Quiz Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
