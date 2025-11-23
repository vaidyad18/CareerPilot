import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-950 to-black text-gray-100">
      <Navbar />

      <section className="px-6 md:px-12 py-24 text-center">
        <h1 className="text-5xl md:text-5xl font-extrabold tracking-tight leading-tight bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Your Complete Career Growth Platform
        </h1>

        <p className="text-lg md:text-lg text-gray-400 max-w-3xl mx-auto mt-6 leading-relaxed">
          Smart tools to build resumes, find jobs, and improve your skills. Built for ambitious people.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          {!user ? (
            <>
              <Link
                to="/signup"
                className="px-10 py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl hover:opacity-90 transition"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="px-10 py-3 rounded-xl border border-gray-600 text-gray-200 font-medium hover:bg-gray-800 transition"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/resume-builder"
                className="px-10 py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl hover:opacity-90 transition"
              >
                Build Resume
              </Link>

              <Link
                to="/jobs"
                className="px-10 py-3 rounded-xl border border-gray-600 text-gray-200 font-medium hover:bg-gray-800 transition"
              >
                Browse Jobs
              </Link>

              <Link
                to="/quiz"
                className="px-10 py-3 rounded-xl border border-gray-600 text-gray-200 font-medium hover:bg-gray-800 transition"
              >
                Take Quiz
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition p-10">
          <h2 className="text-2xl font-semibold mb-3">AI Resume Builder</h2>
          <p className="text-gray-400 text-sm mb-5 leading-relaxed">
            Generate stunning ATS-ready resumes with AI-generated summaries and modern layouts.
          </p>
          <Link className="text-blue-400 font-medium" to={user ? "/resume-builder" : "/signup"}>
            {user ? "Build Resume →" : "Get Started →"}
          </Link>
        </div>

        <div className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition p-10">
          <h2 className="text-2xl font-semibold mb-3">Job Finder & Tracker</h2>
          <p className="text-gray-400 text-sm mb-5 leading-relaxed">
            Track job applications effortlessly and explore curated openings that match your skills.
          </p>
          <Link className="text-blue-400 font-medium" to={user ? "/jobs" : "/signup"}>
            {user ? "Explore Jobs →" : "Get Started →"}
          </Link>
        </div>

        <div className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition p-10">
          <h2 className="text-2xl font-semibold mb-3">Skill-Based Quizzes</h2>
          <p className="text-gray-400 text-sm mb-5 leading-relaxed">
            Practice with structured tests and find where to improve with real insights.
          </p>
          <Link className="text-blue-400 font-medium" to={user ? "/quiz" : "/signup"}>
            {user ? "Take Quiz →" : "Get Started →"}
          </Link>
        </div>
      </section>

      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-800">
        © {new Date().getFullYear()} CareerPilot. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Home;
