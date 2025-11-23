import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Jobs from "./pages/Jobs";
import Quiz from "./pages/Quiz";
import ProtectedRoute from "./layout/ProtectedRoute";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./features/auth/authSlice";
import ViewResume from "./pages/ViewResume";
import { Toaster } from "sonner";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      dispatch(setUser(JSON.parse(saved)));
    }
  }, []);

  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
  path="/view-resume/:resumeId"
  element={
    <ProtectedRoute>
      <ViewResume />
    </ProtectedRoute>
  }
/>


        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume-builder"
          element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
