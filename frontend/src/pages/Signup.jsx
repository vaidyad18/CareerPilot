import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/auth/authActions";
import { Navigate, Link } from "react-router-dom";
import { User, Mail, Lock, ArrowRight, Rocket, Star } from "lucide-react";

const Signup = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(form));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[420px] px-6">
        <div className="text-center mb-10">
           <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-blue-600/10 text-blue-500 mb-6 border border-blue-500/10 shadow-xl shadow-blue-600/5">
              <Rocket size={32} />
           </div>
           <h1 className="tracking-tight mb-3 font-bold text-4xl">
              Create <span className="gradient-text">Account</span>
           </h1>
           <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Join our professional community</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card !p-10 rounded-[40px] space-y-6"
        >
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors">
                 <User size={18} />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-gray-600 focus:border-blue-500 outline-none transition-all shadow-inner"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors">
                 <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-gray-600 focus:border-blue-500 outline-none transition-all shadow-inner"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors">
                 <Lock size={18} />
              </div>
              <input
                type="password"
                placeholder="Create Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-gray-600 focus:border-blue-500 outline-none transition-all shadow-inner"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary !h-14 !rounded-2xl flex items-center justify-center gap-3 group !text-xs !font-bold !uppercase !tracking-widest shadow-xl shadow-blue-600/20 mt-2"
          >
             {loading ? "Creating Account..." : "Sign Up"} 
             {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>

          <div className="pt-4 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Already have an account? 
              <Link to="/login" className="text-blue-500 ml-2 hover:text-blue-400 transition-colors inline-flex items-center gap-2">
                Sign In <Star size={14} />
              </Link>
            </p>
          </div>
        </form>

        <p className="text-center mt-12 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 opacity-40">
           © 2026 CareerPilot Professional
        </p>
      </div>
    </div>
  );
};

export default Signup;
