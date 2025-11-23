import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authActions";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => dispatch(logout());

  return (
    <nav className="backdrop-blur-xl bg-black/30 border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link
        to="/"
        className="font-extrabold text-xl bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent"
      >
        Intelligent Career Advancement
      </Link>

      <div className="flex gap-6 items-center text-gray-300 text-sm font-medium">
        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-white transition">
              Dashboard
            </Link>

            <Link to="/resume-builder" className="hover:text-white transition">
              Resume Builder
            </Link>

            <Link to="/jobs" className="hover:text-white transition">
              Jobs
            </Link>

            <Link to="/quiz" className="hover:text-white transition">
              Quiz
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-1.5 rounded-lg bg-linear-to-r from-red-500 to-red-600 text-white font-medium hover:opacity-90 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/signup"
            className="px-5 py-2 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium hover:opacity-90 transition shadow-lg"
          >
            Get Started
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
