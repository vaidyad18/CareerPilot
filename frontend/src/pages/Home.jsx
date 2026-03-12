import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Rocket, Target, Zap, ShieldCheck, ArrowRight, Sparkles, TrendingUp, Globe, Users, Briefcase } from "lucide-react";

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* Hero Section - Clean & Professional */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
             <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Trusted by modern professionals</span>
          </div>
          
          <h1 className="text-center mb-8 max-w-5xl tracking-tight !leading-[1.1]">
            Build Your <span className="gradient-text">Professional Future</span> with AI-Powered Intelligence
          </h1>

          <p className="text-lg md:text-xl text-gray-400 text-center max-w-3xl mb-12 leading-relaxed">
            CareerPilot is an all-in-one platform designed to help you build better resumes, find your dream job, and assessments your technical edge.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {!user ? (
               <Link to="/signup" className="btn-primary">Get Started Free</Link>
            ) : (
               <Link to="/dashboard" className="btn-primary">Go to Dashboard</Link>
            )}
            <Link to="/jobs" className="btn-secondary flex items-center gap-2">
               Search Jobs <Briefcase size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="px-6 pb-32 max-w-7xl mx-auto">
         <div className="bento-grid">
            {/* Main Featured Block */}
            <div className="col-span-12 lg:col-span-7 glass-card flex flex-col justify-between group overflow-hidden relative">
               <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] pointer-events-none group-hover:bg-blue-600/20 transition-all duration-1000" />
               <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-8">
                     <FileText size={28} />
                  </div>
                  <h2 className="mb-6">AI Resume <span className="text-gray-500 font-medium">Builder</span></h2>
                  <p className="text-lg leading-relaxed text-gray-400 max-w-lg">
                     Create professional, ATS-optimized resumes in minutes. Our AI engine helps you highlight your strengths and get noticed by recruiters.
                  </p>
               </div>
               <div className="mt-16 flex items-center justify-between relative z-10">
                  <Link to={user ? "/resume-builder" : "/signup"} className="text-sm font-bold text-blue-400 flex items-center gap-2 hover:text-white transition-colors">
                     Create Resume <ArrowRight size={18} />
                  </Link>
                  <div className="flex -space-x-3">
                     {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-surface bg-surface-elevated flex items-center justify-center overflow-hidden">
                           <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Side Block - Small */}
            <div className="col-span-12 md:col-span-6 lg:col-span-5 glass-card bg-linear-to-br from-indigo-500/10 to-transparent">
               <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-8">
                  <Zap size={28} />
               </div>
               <h3 className="mb-4">Skill Analytics</h3>
               <p className="text-base text-gray-400 mb-10">
                  Test your technical skills with AI-powered assessments and track your growth.
               </p>
               <Link to={user ? "/quiz" : "/signup"} className="btn-secondary w-full flex justify-center">Start Assessment</Link>
            </div>

            {/* Wide Block - Market */}
            <div className="col-span-12 md:col-span-6 lg:col-span-5 glass-card">
                <div className="flex items-center gap-6 mb-8 text-emerald-400">
                   <Target size={28} />
                   <div className="h-[1px] flex-1 bg-white/10" />
                </div>
                <h3 className="mb-4">Job Search</h3>
                <p className="text-base text-gray-400 mb-8">
                   Find the best job opportunities from around the globe. Filter by remote, salary, and experience levels.
                </p>
                <div className="flex flex-wrap gap-3">
                   {['Remote Jobs', 'Top Tech', 'Fintech'].map(tag => (
                      <span key={tag} className="px-3 py-1.5 rounded-xl bg-white/5 text-xs font-semibold text-gray-400 capitalize">{tag}</span>
                   ))}
                </div>
            </div>

            {/* Bottom Large Block - Horizontal Scroll Pulse */}
            <div className="col-span-12 glass-card !p-0 overflow-hidden">
               <div className="p-10 pb-2 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Market Insights</h3>
                    <p className="text-sm text-gray-500 font-medium mt-1">Real-time trends in the professional landscape</p>
                  </div>
                  <div className="flex gap-3">
                     <button className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-colors"><ArrowRight size={18} className="rotate-180" /></button>
                     <button className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-colors"><ArrowRight size={18} /></button>
                  </div>
               </div>
               
               <div className="horizontal-scroll p-10">
                  {[
                    { label: 'Software Engineering', val: '+24%', icon: <Globe size={24} /> },
                    { label: 'Cloud Architecture', val: '+18%', icon: <Zap size={24} /> },
                    { label: 'Artificial Intelligence', val: '+32%', icon: <Rocket size={24} /> },
                    { label: 'Cybersecurity', val: '+12%', icon: <ShieldCheck size={24} /> },
                    { label: 'Product Design', val: '+15%', icon: <Target size={24} /> },
                    { label: 'Data Science', val: '+21%', icon: <TrendingUp size={24} /> },
                  ].map((item, i) => (
                    <div key={i} className="min-w-[260px] p-8 rounded-[32px] bg-white/[0.02] border border-white/[0.05] snap-start hover:border-blue-500/30 transition-all group">
                       <div className="text-gray-500 mb-6 group-hover:text-blue-500 transition-colors">{item.icon}</div>
                       <div className="text-sm font-bold text-gray-300 mb-2">{item.label}</div>
                       <div className="text-2xl font-black text-white">{item.val} <span className="text-xs text-blue-500 ml-1">growth</span></div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Global Presence Counter */}
      <section className="py-24 bg-surface-soft border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
               { label: 'Active Users', val: '12,000+', icon: <Users size={20} /> },
               { label: 'Job Listings', val: '85,000+', icon: <Globe size={20} /> },
               { label: 'Success Rate', val: '98%', icon: <TrendingUp size={20} /> },
               { label: 'Resumes Created', val: '30,000+', icon: <ShieldCheck size={20} /> },
            ].map((stat, i) => (
               <div key={i} className="flex flex-col items-center text-center">
                  <div className="text-blue-500/40 mb-6">{stat.icon}</div>
                  <div className="text-4xl font-black text-white mb-3">{stat.val}</div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
               </div>
            ))}
        </div>
      </section>

      <footer className="py-20">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 opacity-50">
            <div className="flex items-center gap-3">
               <Sparkles size={20} className="text-blue-500" />
               <span className="text-sm font-bold tracking-widest uppercase">CareerPilot © 2024</span>
            </div>
            <div className="flex flex-wrap justify-center gap-10 text-xs font-bold uppercase tracking-widest">
               <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
               <a href="#" className="hover:text-blue-500 transition-colors">Support</a>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default Home;
