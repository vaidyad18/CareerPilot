import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import {
  searchJobsLinkedIn,
  saveJob,
  applyJob,
  getMyJobs,
} from "../features/jobs/jobActions";
import { Search, MapPin, Building2, ExternalLink, Bookmark, CheckCircle2, Filter, Lock, Sparkles, ArrowRight, Clock, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Jobs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { searchResults, myJobs, loading } = useSelector((state) => state.jobs);

  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("search");
  const [savedList, setSavedList] = useState([]);
  const [filters, setFilters] = useState({
    remote: false,
    country: "",
    experience: "",
  });

  useEffect(() => {
    if (user) {
      dispatch(getMyJobs());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (myJobs) {
      setSavedList(myJobs.map((j) => j.title + j.company));
    }
  }, [myJobs]);

  const handleSearch = () => {
    if (!query.trim()) return;
    dispatch(searchJobsLinkedIn(query.trim()));
  };

  const countries = [
    ...new Set(
      searchResults.map((j) => j.countries_derived?.[0]).filter(Boolean)
    ),
  ];
  const experiences = [
    ...new Set(searchResults.map((j) => j.seniority).filter(Boolean)),
  ];

  const filteredJobs = searchResults.filter((job) => {
    const matchesRemote = !filters.remote || job.remote_derived === true;
    const matchesCountry =
      !filters.country || job.countries_derived?.[0] === filters.country;
    const matchesExperience =
      !filters.experience || job.seniority === filters.experience;
    return matchesRemote && matchesCountry && matchesExperience;
  });

  const handleSave = (job) => {
    if (!user) return;
    dispatch(
      saveJob({
        title: job.title,
        company: job.organization,
        location: job.locations_derived?.[0],
        link: job.url,
        description: job.description_text,
      })
    );
    setSavedList((prev) => [...prev, job.title + job.organization]);
  };

  return (
    <div className="min-h-screen bg-surface pb-24">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <header className="mb-16 flex flex-col items-center text-center">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Sparkles size={16} className="text-blue-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Find Your Next Opportunity</span>
           </div>
           <h1 className="tracking-tight mb-6 !text-5xl">
              Explore the <span className="gradient-text">Job Market</span>
           </h1>
           <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
              Find and track high-impact job opportunities across multiple industries. Browse current listings or search for specific roles.
           </p>
        </header>

        {/* Guest Banner - Professional */}
        {!user && (
           <div className="glass px-10 py-8 rounded-[32px] mb-12 flex flex-col md:flex-row items-center justify-between gap-8 border-blue-500/10 bg-linear-to-r from-blue-600/[0.04] to-transparent">
              <div className="flex items-center gap-6">
                 <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Lock size={24} />
                 </div>
                 <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white">Save & Track Jobs</h3>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mt-2">Sign up to unlock personalized job tracking and saved lists</p>
                 </div>
              </div>
              <Link to="/signup" className="btn-primary flex items-center gap-3 !py-3 !px-8">
                 Get Started Free <ArrowRight size={18} />
              </Link>
           </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
           <aside className="w-full lg:w-72 space-y-8">
              <div className="glass-card !p-8 space-y-8 rounded-[32px]">
                 <div className="flex items-center gap-3 text-white font-bold text-xs uppercase tracking-widest">
                    <Filter size={18} className="text-blue-500" />
                    Filters
                 </div>
                 
                 <div className="space-y-6">
                    <label className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] cursor-pointer hover:bg-white/[0.05] transition-colors">
                       <input
                          type="checkbox"
                          className="w-4 h-4 rounded bg-surface text-blue-500 focus:ring-blue-500"
                          checked={filters.remote}
                          onChange={(e) => setFilters({ ...filters, remote: e.target.checked })}
                       />
                       <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Remote Only</span>
                    </label>

                    <div className="space-y-2">
                       <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-700 px-1">Location</p>
                       <select
                          className="w-full p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.1] text-sm font-bold text-gray-400 outline-none focus:border-blue-500 transition-colors"
                          value={filters.country}
                          onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                       >
                          <option value="">All Regions</option>
                          {countries?.map((c, i) => <option key={i} value={c}>{c}</option>)}
                       </select>
                    </div>

                    <div className="space-y-2">
                       <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-700 px-1">Experience</p>
                       <select
                          className="w-full p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.1] text-sm font-bold text-gray-400 outline-none focus:border-blue-500 transition-colors"
                          value={filters.experience}
                          onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                       >
                          <option value="">Any Level</option>
                          {experiences?.map((ex, i) => <option key={i} value={ex}>{ex}</option>)}
                       </select>
                    </div>
                 </div>
              </div>

              {user && (
                 <button
                    onClick={() => setTab(tab === "search" ? "saved" : "search")}
                    className={`w-full p-5 rounded-[24px] flex items-center justify-between font-bold text-xs uppercase tracking-widest transition-all ${tab === "saved" ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-white/[0.02] border border-white/[0.08] text-gray-500 hover:text-white hover:bg-white/[0.05]'}`}
                 >
                    <span className="flex items-center gap-3">
                       <Bookmark size={18} /> {tab === "saved" ? "Market Feed" : "Saved Jobs"}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-black/20">{myJobs.length}</span>
                 </button>
              )}
           </aside>

           {/* Content Area - Feed */}
           <div className="flex-1 space-y-8">
              {tab === "search" && (
                 <>
                    <div className="relative group overflow-hidden rounded-[24px]">
                       <input
                          type="text"
                          placeholder="Search job titles or keywords..."
                          className="w-full h-14 pl-14 pr-32 rounded-[24px] bg-white/[0.03] border border-white/[0.08] text-sm text-white focus:border-blue-500 outline-none transition-all"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                       />
                       <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                       <button
                          onClick={handleSearch}
                          className="absolute right-1.5 top-1.5 h-11 px-8 rounded-2xl bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-xl"
                       >
                          Search
                       </button>
                    </div>

                    {loading ? (
                       <div className="flex flex-col items-center justify-center py-32 gap-6">
                          <div className="w-10 h-10 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin" />
                          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Updating listings...</p>
                       </div>
                    ) : (
                       <div className="space-y-4">
                          {filteredJobs.length > 0 ? (
                             filteredJobs.map((job, i) => {
                                const isSaved = savedList.includes(job.title + job.organization);
                                return (
                                   <div key={i} className="glass-card !p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group rounded-[32px]">
                                      <div className="space-y-3">
                                         <h3 className="text-xl font-bold text-white group-hover:text-blue-500 transition-colors uppercase tracking-tight">{job.title}</h3>
                                         <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                            <span className="flex items-center gap-2"><Building2 size={16} className="text-gray-700" /> {job.organization}</span>
                                            <span className="flex items-center gap-2"><MapPin size={16} className="text-gray-700" /> {job.locations_derived?.[0]}</span>
                                            {job.remote_derived && (
                                               <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px]">Remote Available</span>
                                            )}
                                         </div>
                                      </div>

                                      <div className="flex items-center gap-3 w-full md:w-auto">
                                         <a
                                            href={job.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all flex items-center gap-2"
                                         >
                                            View Details <ExternalLink size={14} />
                                         </a>
                                         {user && (
                                            <button
                                               onClick={() => !isSaved && handleSave(job)}
                                               className={`px-6 py-3 rounded-2xl border text-xs font-bold uppercase tracking-widest transition-all ${isSaved ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-blue-500/10 border-blue-500/20 text-blue-500 hover:bg-blue-500 hover:text-white'}`}
                                            >
                                               {isSaved ? "Saved" : "Save Job"}
                                            </button>
                                         )}
                                      </div>
                                   </div>
                                );
                             })
                          ) : (
                             <div className="py-32 text-center glass rounded-[40px] border-dashed border-white/5 opacity-30">
                                <Globe className="mx-auto mb-6 text-gray-600" size={48} />
                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">No listings found</h4>
                                <p className="text-xs text-gray-600 font-bold uppercase tracking-widest mt-3">Try adjusting your search or filters</p>
                             </div>
                          )}
                       </div>
                    )}
                 </>
              )}

              {tab === "saved" && (
                 <div className="space-y-4">
                    {myJobs.length > 0 ? (
                       myJobs.map((job) => (
                          <div key={job._id} className="glass-card !p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 rounded-[32px]">
                             <div>
                                <h3 className="text-xl font-bold text-white uppercase tracking-tight">{job.title}</h3>
                                <div className="flex items-center gap-4 mt-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                   <span>{job.company}</span>
                                   <span className="text-gray-800">•</span>
                                   <span>{job.location}</span>
                                </div>
                                {job.applied && (
                                   <div className="mt-5 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                                      <CheckCircle2 size={12} /> Application Sent
                                   </div>
                                )}
                             </div>

                             {!job.applied && (
                                <button
                                   onClick={() => dispatch(applyJob(job._id))}
                                   className="btn-primary !py-3 !px-8 !text-xs"
                                >
                                   Mark as Applied
                                </button>
                             )}
                          </div>
                       ))
                    ) : (
                       <div className="py-32 text-center glass rounded-[40px] border-dashed border-white/5 opacity-30">
                          <Bookmark className="mx-auto mb-6 text-gray-600" size={48} />
                          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">No saved jobs yet</h4>
                       </div>
                    )}
                 </div>
              )}
           </div>
        </div>
      </main>
    </div>
  );
};

export default Jobs;
