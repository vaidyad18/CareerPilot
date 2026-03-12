import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authActions";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, LayoutDashboard, FileText, Award, LogOut, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const navLinks = [
    { name: "Jobs", path: "/jobs", public: true },
    { name: "Dashboard", path: "/dashboard", public: false },
    { name: "Resumes", path: "/resume-builder", public: false },
    { name: "Assessments", path: "/quiz", public: false },
  ];

  const visibleLinks = navLinks.filter(link => link.public || user);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="glass px-8 h-16 rounded-[24px] flex items-center justify-between shadow-2xl border-white/10">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-all duration-500">
            <Sparkles className="text-white" size={20} />
          </div>
          <span className="text-base font-bold text-white tracking-tight flex items-center gap-1">
            Career<span className="text-blue-500">Pilot</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {visibleLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm font-semibold text-gray-400 hover:text-white transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <button
              onClick={handleLogout}
              className="text-sm font-bold text-red-500 hover:text-red-400 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">
                Log In
              </Link>
              <Link to="/signup" className="px-6 py-2.5 rounded-xl bg-white text-black text-sm font-bold hover:bg-blue-600 hover:text-white transition-all">
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 glass rounded-[32px] p-8 flex flex-col gap-6 animate-in fade-in slide-in-from-top-4">
          {visibleLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold text-gray-300 py-3 border-b border-white/5"
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <button
              onClick={handleLogout}
              className="text-lg font-bold text-red-500 pt-3 cursor-pointer text-left"
            >
              Sign Out
            </button>
          ) : (
            <div className="flex flex-col gap-4 pt-4">
              <Link to="/login" className="text-lg font-bold text-gray-300" onClick={() => setIsOpen(false)}>Log In</Link>
              <Link to="/signup" className="btn-primary text-center !rounded-2xl py-4" onClick={() => setIsOpen(false)}>Get Started</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
