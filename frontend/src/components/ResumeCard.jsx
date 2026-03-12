import { Loader2, MoreVertical, Eye, Trash2, FileText, Download } from "lucide-react";
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
      toast.success("Resume deleted from repository");
      refreshData();
      setLoading(false);
      setShowConfirm(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to execute deletion");
      setLoading(false);
    }
  };

  return (
    <div className="relative group rounded-[32px] overflow-hidden glass border-white/5 shadow-xl hover:shadow-2xl hover:border-white/20 transition-all duration-500 h-full flex flex-col">
      <Link to={`/view-resume/${resume._id}`} className="flex-1">
        <div className="relative flex justify-center items-center py-14 bg-linear-to-b from-blue-600/10 to-transparent group-hover:from-blue-600/20 transition-all duration-500">
          <div className="p-5 rounded-3xl bg-blue-500/10 text-blue-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
             <FileText size={48} strokeWidth={1.5} />
          </div>
          
          <div className="absolute top-4 left-4">
             <div className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest text-gray-500 group-hover:text-blue-400 transition-colors">
                v1.0
             </div>
          </div>
        </div>
      </Link>

      <div className="p-6 pt-0 mt-auto">
        <div className="flex justify-between items-center gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white truncate capitalize group-hover:text-blue-400 transition-colors">
              {resume.title || "Untitled Resume"}
            </h3>
            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest mt-0.5">
               Synthesized Profile
            </p>
          </div>

          <div className="relative">
             <button 
               onClick={() => setShowMenu(!showMenu)}
               className="p-2 rounded-xl hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
             >
               <MoreVertical size={18} />
             </button>

             {showMenu && (
               <>
                 <div 
                   className="fixed inset-0 z-10" 
                   onClick={() => setShowMenu(false)}
                 />
                 <div className="absolute bottom-full right-0 mb-2 w-48 glass rounded-2xl border-white/10 shadow-2xl overflow-hidden z-20 animate-in fade-in slide-in-from-bottom-2 duration-200">
                   <Link
                     to={`/view-resume/${resume._id}`}
                     className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                   >
                     <Eye size={16} /> View Analysis
                   </Link>
                   <Link
                     to={`/view-resume/${resume._id}`}
                     className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                   >
                     <Download size={16} /> Export PDF
                   </Link>
                   <button
                     className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                     onClick={() => {
                       setShowMenu(false);
                       setShowConfirm(true);
                     }}
                   >
                     <Trash2 size={16} /> Delete Entry
                   </button>
                 </div>
               </>
             )}
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-surface/80 backdrop-blur-md flex justify-center items-center z-[100] p-6">
          <div className="glass border-white/10 rounded-[40px] p-10 max-w-sm w-full text-center shadow-2xl">
            <div className="w-16 h-16 rounded-3xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-6">
               <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Confirm Erasure</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              This will permanently remove this profile from our secure storage. This action is irreversible.
            </p>

            <div className="grid grid-cols-1 gap-3">
              <button
                className="btn-primary !bg-red-600 !hover:bg-red-700 flex items-center justify-center gap-2"
                onClick={onDelete}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : "Validate Erasure"}
              </button>
              <button
                className="px-6 py-3 rounded-2xl text-sm font-bold text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                onClick={() => setShowConfirm(false)}
              >
                Retain Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeCard;
