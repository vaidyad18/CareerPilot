import { Loader2, MoreVertical, Eye, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const ResumeCard = ({ resume, refreshData }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/resumes/${resume._id}`, {
        withCredentials: true,
      });
      toast("Resume deleted");
      refreshData();
      setLoading(false);
      setShowConfirm(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
      setLoading(false);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/10 border border-white/15 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition duration-300">
      <Link to={`/view-resume/${resume._id}`}>
        <div className="flex justify-center items-center py-12 bg-linear-to-t from-indigo-600/40 to-blue-500/40">
          <img
            className="w-16 sm:w-20 opacity-90 hover:opacity-100 transform hover:scale-110 transition"
            src="https://cdn-icons-png.flaticon.com/512/7039/7039285.png"
            alt="resume-icon"
          />
        </div>
      </Link>

      <div
        className="flex justify-between items-center px-4 py-3 border-t border-white/10"
        style={{ backgroundColor: `${resume.theme}1A` }}
      >
        <p className="text-sm font-semibold capitalize text-white truncate max-w-[150px]">
          {resume.title}
        </p>

        <button onClick={() => setShowMenu(!showMenu)}>
          <MoreVertical className="w-5 h-5 text-gray-200 hover:text-white cursor-pointer transition" />
        </button>
      </div>

      {showMenu && (
        <div className="absolute top-20 right-3 w-40 bg-gray-900/90 border border-white/10 shadow-2xl rounded-xl overflow-hidden z-10 backdrop-blur-md animate-fadeIn">
          <Link
            to={`/resume/${resume._id}/view`}
            className="flex items-center gap-2 px-4 py-3 text-sm text-gray-200 hover:bg-white/10 transition"
          >
            <Eye className="w-4 h-4" /> View
          </Link>

          <button
            className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/20 transition"
            onClick={() => {
              setShowMenu(false);
              setShowConfirm(true);
            }}
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-[330px] shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-2">Delete Resume?</h3>
            <p className="text-sm text-gray-400 mb-5">
              This action will permanently delete your resume.
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-xl bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2"
                onClick={onDelete}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeCard;
