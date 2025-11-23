import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { loadDashboard } from "../features/dashboard/dashboardActions";
import ResumeCard from "../components/ResumeCard";
import { FileText, Bookmark, CheckCircle2, Layers } from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, latest, resumes, jobs, loading } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(loadDashboard());
  }, [dispatch]);

  if (loading || !stats)
    return (
      <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-950 to-black text-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-extrabold mb-8 bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Dashboard
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
          <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/10 shadow-md text-center hover:-translate-y-1 transition">
            <FileText className="mx-auto mb-2" />
            <h3 className="text-3xl font-extrabold text-blue-400">
              {stats.resumeCount}
            </h3>
            <p className="text-gray-400 text-sm mt-1">Resumes</p>
          </div>

          <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/10 shadow-md text-center hover:-translate-y-1 transition">
            <Bookmark className="mx-auto mb-2" />
            <h3 className="text-3xl font-extrabold text-green-400">
              {stats.savedJobsCount}
            </h3>
            <p className="text-gray-400 text-sm mt-1">Saved Jobs</p>
          </div>

          <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/10 shadow-md text-center hover:-translate-y-1 transition">
            <CheckCircle2 className="mx-auto mb-2" />
            <h3 className="text-3xl font-extrabold text-purple-400">
              {stats.appliedJobsCount}
            </h3>
            <p className="text-gray-400 text-sm mt-1">Applied Jobs</p>
          </div>

          <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/10 shadow-md text-center hover:-translate-y-1 transition">
            <Layers className="mx-auto mb-2" />
            <h3 className="text-3xl font-extrabold text-red-400">
              {stats.quizAttemptsCount}
            </h3>
            <p className="text-gray-400 text-sm mt-1">Quizzes Attempted</p>
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-4">Recent Activity</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-lg backdrop-blur-xl">
            <h4 className="font-semibold mb-3">Latest Resume</h4>
            {latest?.resume ? (
              <ResumeCard
                resume={latest.resume}
                refreshData={() => dispatch(loadDashboard())}
              />
            ) : (
              <p className="text-sm text-gray-400">No resume created</p>
            )}
          </div>

          <div className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-lg backdrop-blur-xl">
            <h4 className="font-semibold mb-3">Last Applied Job</h4>
            {latest?.job ? (
              <>
                <p className="font-medium text-white">{latest.job.title}</p>
                <p className="text-sm text-gray-300">{latest.job.company}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {new Date(latest.job.appliedAt).toLocaleString()}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-400">No jobs applied</p>
            )}
          </div>

          <div className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-lg backdrop-blur-xl">
            <h4 className="font-semibold mb-3">Last Quiz Attempt</h4>
            {latest?.quiz ? (
              <>
                <p className="font-medium text-white">
                  {latest.quiz.quizId.topic} |{" "}
                  <span
                    className={
                      latest.quiz.quizId.difficulty === "easy"
                        ? "text-green-400"
                        : latest.quiz.quizId.difficulty === "medium"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }
                  >
                    {latest.quiz.quizId.difficulty}
                  </span>
                </p>
                <p className="text-sm text-gray-300">
                  Score: {latest.quiz.score}/{latest.quiz.total}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-400">No quiz attempted</p>
            )}
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-3">Recent Quiz Attempts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {latest?.quizHistory?.length > 0 ? (
            latest.quizHistory.map((q) => (
              <div
                key={q._id}
                className="p-5 bg-white/10 rounded-xl border border-white/10 shadow-md"
              >
                <p className="font-medium">
                  {q.quizId?.topic} |{" "}
                  <span
                    className={
                      q.quizId?.difficulty === "easy"
                        ? "text-green-400"
                        : q.quizId?.difficulty === "medium"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }
                  >
                    {q.quizId?.difficulty}
                  </span>
                </p>
                <p className="text-sm text-gray-300">
                  Score: {q.score} / {q.total}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {new Date(q.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No quiz history</p>
          )}
        </div>

        <h3 className="text-2xl font-semibold mb-4">Saved & Applied Jobs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {Array.isArray(jobs) && jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job._id}
                className="p-5 bg-white/10 rounded-xl border border-white/10 shadow-md"
              >
                <p className="font-semibold">
                  {job.title} — {job.company}
                </p>
                <p className="text-sm text-gray-300">{job.location}</p>
                <p
                  className={`mt-1 font-semibold ${
                    job.applied ? "text-green-400" : "text-blue-400"
                  }`}
                >
                  {job.applied ? "Applied" : "Saved"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No saved or applied jobs yet.
            </p>
          )}
        </div>

        <h3 className="text-2xl font-semibold mb-4">All Resumes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {resumes?.length > 0 ? (
            resumes.map((resume) => (
              <ResumeCard
                key={resume._id}
                resume={resume}
                refreshData={() => dispatch(loadDashboard())}
              />
            ))
          ) : (
            <p className="text-sm text-gray-400">No resumes available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
