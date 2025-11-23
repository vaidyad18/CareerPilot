import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authActions";
import { Navigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-900 via-black to-gray-900 text-gray-100">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-xl bg-white/10 border border-white/10 shadow-xl rounded-2xl w-96 p-8"
      >
        <h2 className="text-3xl font-extrabold text-center bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-xs text-gray-400 text-center mt-1 mb-6">
          Log in to continue
        </p>

        <div className="relative mb-6">
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 pt-6 pb-2 rounded-xl bg-gray-800/60 border border-white/10 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            required
          />
          <label className="absolute left-4 top-1 text-xs text-gray-400 peer-focus:text-blue-400 transition-all">
            Email
          </label>
        </div>

        <div className="relative mb-6">
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 pt-6 pb-2 rounded-xl bg-gray-800/60 border border-white/10 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            required
          />
          <label className="absolute left-4 top-1 text-xs text-gray-400 peer-focus:text-blue-400 transition-all">
            Password
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium py-2 rounded-xl hover:opacity-90 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-400">
          Don’t have an account?
          <Link to="/signup" className="text-blue-400 font-semibold ml-1 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
