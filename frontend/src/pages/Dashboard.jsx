import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { loadDashboard } from "../features/dashboard/dashboardActions";
import ResumeCard from "../components/ResumeCard";
import { FileText, Bookmark, CheckCircle2, Award, Clock, ArrowRight, UserCircle, Target, Layout, FilePlus, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { stats, latest, resumes, jobs, loading } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(loadDashboard());
  }, [dispatch]);

  if (loading || !stats)
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700">Synchronizing Data...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-surface pb-24">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Header - Simple & Professional */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
           <div>
              <div className="flex items-center gap-2 mb-3">
                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                 <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Welcome back, {user?.name}</span>
              </div>
              <h1 className="tracking-tight !text-5xl">
                Your <span className="gradient-text">Dashboard</span>
              </h1>
           </div>
           
           <div className="flex gap-4">
              <Link to="/resume-builder" className="btn-primary !px-10 !py-4 flex items-center gap-2">
                 <FileText size={20} /> Create New Resume
              </Link>
           </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="bento-grid">
           {/* Profile Performance */}
           <div className="col-span-12 lg:col-span-4 glass-card bg-linear-to-br from-blue-600/5 to-transparent relative overflow-hidden group !p-12">
              <div className="absolute top-0 right-0 p-10 text-blue-500/5 group-hover:scale-110 transition-transform duration-700">
                 <Rocket size={160} />
              </div>
              <div className="relative z-10">
                 <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Profile Performance</p>
                 <div className="text-7xl font-black text-white mb-4 tracking-tight">
                    {stats.resumeCount > 0 ? `${stats.resumeCount * 12}%` : "0%"}
                 </div>
                 <p className="text-base text-gray-400 max-w-[240px] leading-relaxed">
                    Overall growth based on your resume optimization and activity.
                 </p>
              </div>
           </div>

           {/* Stats Block - Applications */}
           <div className="col-span-12 md:col-span-6 lg:col-span-4 glass-card flex flex-col justify-between !p-12">
              <div className="flex items-center justify-between">
                 <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 size={28} />
                 </div>
                 <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active Jobs</span>
              </div>
              <div className="mt-10">
                 <div className="text-5xl font-black text-white mb-2">{stats.appliedJobsCount}</div>
                 <p className="text-sm uppercase tracking-widest font-extrabold text-emerald-500/70">Applications Sent</p>
              </div>
              <Link to="/jobs" className="mt-10 flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors tracking-widest uppercase group">
                 Browse New Jobs <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
           </div>

           {/* Stats Block - Quiz */}
           <div className="col-span-12 md:col-span-6 lg:col-span-4 glass-card flex flex-col justify-between !p-12">
              <div className="flex items-center justify-between">
                 <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <Award size={28} />
                 </div>
                 <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Growth Points</span>
              </div>
              <div className="mt-10">
                 <div className="text-5xl font-black text-white mb-2">{stats.quizAttemptsCount}</div>
                 <p className="text-sm uppercase tracking-widest font-extrabold text-purple-400/70">Assessments Taken</p>
              </div>
              <Link to="/quiz" className="mt-10 flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors tracking-widest uppercase group">
                 Assess Your Skills <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
           </div>

           {/* Large Section - Horizontal Resumes */}
           <div className="col-span-12 glass-card !p-0 overflow-hidden">
              <div className="p-12 pb-6 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <Layout size={24} className="text-blue-500" />
                    <h3 className="text-xl font-bold uppercase tracking-tight">Saved Resumes</h3>
                 </div>
                 <div className="flex items-center gap-6">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stats.resumeCount} Total</span>
                    <Link to="/resume-builder" className="p-3 rounded-xl bg-white/5 text-blue-400 hover:bg-blue-500 hover:text-white transition-all">
                       <FilePlus size={20} />
                    </Link>
                 </div>
              </div>
              
              <div className="horizontal-scroll p-12 pt-6">
                 {resumes?.length > 0 ? (
                    resumes.map((resume) => (
                      <div key={resume._id} className="min-w-[320px] md:min-w-[380px]">
                        <ResumeCard
                          resume={resume}
                          refreshData={() => dispatch(loadDashboard())}
                        />
                      </div>
                    ))
                 ) : (
                    <div className="w-full py-20 flex flex-col items-center justify-center glass rounded-[40px] border-dashed border-white/10 opacity-30">
                       <FileText size={48} className="mb-6 text-gray-400" />
                       <p className="text-sm font-bold uppercase tracking-widest text-gray-500">No resumes found</p>
                    </div>
                 )}
              </div>
           </div>

           {/* Latest Activity Pulse */}
           <div className="col-span-12 lg:col-span-8 glass-card !p-12">
              <div className="flex items-center gap-4 mb-10">
                 <Clock size={24} className="text-indigo-400" />
                 <h3 className="text-xl font-bold uppercase tracking-tight">Recent Activity</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-6">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Last Job Applied</p>
                    {latest?.job ? (
                       <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-between group hover:border-blue-500/30 transition-all">
                          <div>
                             <div className="text-base font-bold text-white mb-1">{latest.job.title}</div>
                             <div className="text-sm text-gray-400">{latest.job.company}</div>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                             <CheckCircle2 size={20} />
                          </div>
                       </div>
                    ) : (
                       <div className="text-sm text-gray-500 italic px-2">No recent application activity.</div>
                    )}
                 </div>
                 <div className="space-y-6">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Last Assessment</p>
                    {latest?.quiz ? (
                       <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-between group hover:border-blue-500/30 transition-all">
                          <div>
                             <div className="text-base font-bold text-white mb-1">{latest.quiz.quizId.topic}</div>
                             <div className="text-sm text-gray-400">Score Achieved</div>
                          </div>
                          <div className="text-lg font-black text-blue-500 bg-blue-500/10 px-4 py-1.5 rounded-xl">{latest.quiz.score}/{latest.quiz.total}</div>
                       </div>
                    ) : (
                       <div className="text-sm text-gray-500 italic px-2">No recent assessment data.</div>
                    )}
                 </div>
              </div>
           </div>

           {/* Quick Link - Market Intelligence */}
           <div className="col-span-12 lg:col-span-4 glass-card bg-indigo-600 flex items-center justify-center group overflow-hidden relative border-none !p-0">
              <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-indigo-700 opacity-95 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-[80px] translate-x-12 -translate-y-12" />
              <Link to="/jobs" className="relative z-10 flex flex-col items-center gap-6 text-white w-full h-full p-12">
                 <div className="w-20 h-20 rounded-[32px] bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 backdrop-blur-xl border border-white/10 shadow-2xl">
                    <Briefcase size={40} />
                 </div>
                 <div className="text-center">
                    <div className="text-lg font-bold uppercase tracking-widest mb-2">Job Market</div>
                    <div className="text-xs opacity-70 uppercase font-bold tracking-widest">Explore New Opportunities</div>
                 </div>
                 <ArrowRight size={24} className="mt-4 group-hover:translate-x-3 transition-transform" />
              </Link>
           </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
