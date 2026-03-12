import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { generateQuiz, submitQuiz } from "../features/quiz/quizActions";
import { BrainCircuit, Timer, Trophy, CheckCircle, XCircle, ArrowRight, RotateCcw, Activity } from "lucide-react";

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
    if (!topic.trim()) return;
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
      setTimeout(() => nextQuestion(), 500);
      return;
    }
    const t = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, mode, nextQuestion]);

  return (
    <div className="min-h-screen bg-surface pb-24">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <header className="text-center mb-16 flex flex-col items-center">
           <div className="inline-flex p-4 rounded-3xl bg-blue-600/10 text-blue-500 mb-6">
              <BrainCircuit size={40} />
           </div>
           <h1 className="tracking-tight mb-6 !text-5xl">
              AI <span className="gradient-text">Skills Assessment</span>
           </h1>
           <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Test your technical knowledge with dynamically generated quizzes. Choose a topic and difficulty level to begin.
           </p>
        </header>

        {mode === "select" && (
          <div className="glass-card !p-12 rounded-[40px] max-w-xl mx-auto">
            <div className="space-y-8">
              <div className="space-y-3">
                 <label className="text-xs font-bold uppercase tracking-widest text-gray-500 px-1">Quiz Topic</label>
                 <input
                   type="text"
                   placeholder="e.g. React Patterns, System Design..."
                   value={topic}
                   onChange={(e) => setTopic(e.target.value)}
                   className="w-full bg-white/[0.03] border border-white/[0.1] rounded-[20px] px-6 py-4 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-gray-600"
                 />
              </div>

              <div className="space-y-3">
                 <label className="text-xs font-bold uppercase tracking-widest text-gray-500 px-1">Difficulty Level</label>
                 <div className="grid grid-cols-3 gap-3">
                   {['easy', 'medium', 'hard'].map((level) => (
                     <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`py-3 rounded-2xl border text-xs font-bold uppercase tracking-widest transition-all ${difficulty === level ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-white/[0.03] border-white/[0.08] text-gray-500 hover:text-white hover:bg-white/[0.05]'}`}
                     >
                        {level}
                     </button>
                   ))}
                 </div>
              </div>

              <button
                onClick={startQuiz}
                className="w-full btn-primary !py-4 flex items-center justify-center gap-3 group !text-xs !rounded-[20px]"
              >
                Start Assessment <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {mode === "loading" && (
           <div className="flex flex-col items-center justify-center py-24 gap-6">
              <div className="w-10 h-10 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin" />
              <div className="text-center">
                 <p className="text-xs font-black uppercase tracking-[0.3em] text-white italic">Compiling Intelligence...</p>
                 <p className="text-[10px] font-bold text-gray-700 uppercase tracking-widest mt-2">Generating unique question sets</p>
              </div>
           </div>
        )}

        {mode === "quiz" && quiz && (
          <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
            <div className="flex items-center justify-between glass-card !px-8 !py-5 rounded-[24px]">
               <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Question Status</p>
                  <div className="text-base font-black text-white uppercase">
                     {index + 1} <span className="text-gray-700">/ {quiz.questions.length}</span>
                  </div>
               </div>
               <div className="flex flex-col items-end">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Time Remaining</p>
                  <div className={`flex items-center gap-2 text-xl font-black ${timer < 5 ? 'text-red-500 animate-pulse' : 'text-blue-500'}`}>
                     <Timer size={20} /> {timer}s
                  </div>
               </div>
            </div>

            <div className="glass-card !p-12 rounded-[40px] relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-white/[0.02]">
                  <div 
                     className="h-full bg-blue-600 transition-all duration-1000 shadow-[0_0_20px_rgba(37,99,235,0.5)]" 
                     style={{ width: `${((index + 1) / quiz.questions.length) * 100}%` }}
                  />
               </div>
               
               <h3 className="text-2xl font-bold text-white leading-relaxed mb-10">{quiz.questions[index].question}</h3>

               <div className="grid grid-cols-1 gap-4">
                 {quiz.questions[index].options.map((opt, i) => (
                   <button
                     key={i}
                     onClick={() => {
                        const upd = [...answers];
                        upd[index] = i;
                        setAnswers(upd);
                     }}
                     className={`w-full text-left px-8 py-5 rounded-[24px] transition-all duration-300 flex items-center justify-between group border ${
                        answers[index] === i
                          ? "bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-600/30"
                          : "bg-white/[0.03] border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.05]"
                     }`}
                   >
                     <span className="text-sm font-bold">{opt}</span>
                     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${answers[index] === i ? 'bg-white border-white' : 'border-white/10 group-hover:border-white/20'}`}>
                        {answers[index] === i && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                     </div>
                   </button>
                 ))}
               </div>
            </div>

            <button
               onClick={nextQuestion}
               disabled={answers[index] === undefined}
               className={`w-full py-5 rounded-[24px] font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-xl ${answers[index] === undefined ? 'opacity-20 cursor-not-allowed bg-white/5 text-gray-600' : 'btn-primary'}`}
            >
               {index === quiz.questions.length - 1 ? "Complete Assessment" : "Next Question"}
               <ArrowRight size={18} />
            </button>
          </div>
        )}

        {mode === "score" && showScore && (
          <div className="animate-fade-in space-y-6 max-w-2xl mx-auto">
            <div className="glass-card !p-12 rounded-[40px] text-center">
               <div className="inline-flex p-5 rounded-3xl bg-emerald-500/10 text-emerald-500 mb-8 border border-emerald-500/10">
                  <Trophy size={64} />
               </div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Overall Score</h3>
               <div className="text-8xl font-black text-white mb-8 tracking-tighter">
                  {Math.round((finalScore.score / finalScore.total) * 100)}<span className="text-blue-500">%</span>
               </div>
               <p className="text-base font-bold text-gray-400 uppercase tracking-widest mb-10">You got {finalScore.score} out of {finalScore.total} correct</p>
               
               <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                  <button
                    onClick={() => { setMode("select"); setShowScore(false); }}
                    className="btn-primary !text-xs !rounded-2xl flex items-center justify-center gap-3 !py-4"
                  >
                    <RotateCcw size={18} /> Retake Quiz
                  </button>
                  <button className="px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all flex items-center justify-center gap-3">
                    <Activity size={18} /> Performance
                  </button>
               </div>
            </div>

            <div className="space-y-4">
               <h4 className="text-[10px] font-black text-gray-700 uppercase tracking-[0.2em] px-2 mb-2">Protocol Analysis</h4>
               <div className="space-y-3">
                  {detailedAnswers.map((ans, i) => (
                    <div key={i} className="glass-card !p-6 rounded-[24px]">
                      <p className="text-sm font-bold text-white mb-5 leading-relaxed flex items-start gap-3">
                         <span className="text-gray-800 font-black">S{i+1}</span>
                         {ans.question}
                      </p>

                      <div className="space-y-2">
                        {ans.options.map((opt, idx) => {
                          const isCorrect = idx === ans.correctIndex;
                          const isSelected = ans.selected === idx;
                          return (
                            <div
                              key={idx}
                              className={`px-4 py-3 rounded-xl flex items-center justify-between border transition-colors ${
                                isCorrect 
                                  ? "bg-emerald-500/[0.03] border-emerald-500/10 text-emerald-500 font-bold"
                                  : isSelected
                                  ? "bg-red-500/[0.03] border-red-500/10 text-red-400"
                                  : "bg-white/[0.01] border-white/[0.05] text-gray-800"
                              }`}
                            >
                              <span className="text-[11px] font-bold uppercase tracking-wide">{opt}</span>
                              {isCorrect && <CheckCircle size={14} />}
                              {isSelected && !isCorrect && <XCircle size={14} />}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Quiz;
