import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import {
  searchJobsLinkedIn,
  saveJob,
  applyJob,
  getMyJobs,
} from "../features/jobs/jobActions";

const Jobs = () => {
  const dispatch = useDispatch();
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
    dispatch(getMyJobs());
  }, [dispatch]);

  useEffect(() => {
    if (myJobs) {
      setSavedList(myJobs.map((j) => j.title + j.company));
    }
  }, [myJobs]);

  const handleSearch = () => {
    if (!query.trim()) return alert("Enter a job role");
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
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900 text-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-extrabold mb-8 bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Job Finder
        </h2>

        <div className="flex gap-4 mb-8">
          <button
            className={`px-6 py-2 rounded-xl font-medium transition ${
              tab === "search"
                ? "bg-blue-600 text-white"
                : "bg-gray-800/60 text-gray-300 border border-white/10"
            }`}
            onClick={() => setTab("search")}
          >
            Search Jobs
          </button>

          <button
            className={`px-6 py-2 rounded-xl font-medium transition ${
              tab === "saved"
                ? "bg-blue-600 text-white"
                : "bg-gray-800/60 text-gray-300 border border-white/10"
            }`}
            onClick={() => setTab("saved")}
          >
            Saved & Applied Jobs
          </button>
        </div>

        {tab === "search" && (
          <>
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                placeholder="Search job role..."
                className="flex-1 px-4 py-3 rounded-xl bg-gray-800/60 border border-white/10 text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <button
                onClick={handleSearch}
                className="px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition text-white font-medium"
              >
                Search
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/60 border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.remote}
                  onChange={(e) =>
                    setFilters({ ...filters, remote: e.target.checked })
                  }
                />
                Remote
              </label>

              <select
                className="px-4 py-2 rounded-xl bg-gray-800/60 border border-white/10 text-gray-100"
                value={filters.country}
                onChange={(e) =>
                  setFilters({ ...filters, country: e.target.value })
                }
              >
                <option value="">Country</option>
                {countries.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                className="px-4 py-2 rounded-xl bg-gray-800/60 border border-white/10 text-gray-100"
                value={filters.experience}
                onChange={(e) =>
                  setFilters({ ...filters, experience: e.target.value })
                }
              >
                <option value="">Experience</option>
                {experiences.map((ex, i) => (
                  <option key={i} value={ex}>
                    {ex}
                  </option>
                ))}
              </select>
            </div>

            {loading && (
              <p className="text-blue-400 mt-4 animate-pulse">
                Loading jobs...
              </p>
            )}

            <div className="grid grid-cols-1 gap-5 mt-6">
              {filteredJobs.slice(0, 10).map((job, i) => {
                const isSaved = savedList.includes(
                  job.title + job.organization
                );
                return (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl shadow-lg hover:-translate-y-1 transition flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-bold">{job.title}</h3>
                      <p className="text-gray-300">{job.organization}</p>
                      <p className="text-sm text-gray-400">
                        {job.locations_derived?.[0]} (
                        {job.countries_derived?.[0]})
                      </p>
                    </div>

                    <div className="flex gap-3 items-center">
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition font-medium"
                      >
                        View Job
                      </a>

                      <button
                        disabled={isSaved}
                        onClick={() => handleSave(job)}
                        className={`px-4 py-2 rounded-xl font-medium transition ${
                          isSaved
                            ? "bg-transparent text-green-400 border border-green-500 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                      >
                        {isSaved ? "Saved" : "Save"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {tab === "saved" && (
          <div className="grid grid-cols-1 gap-4">
            {myJobs.length > 0 ? (
              myJobs.map((job) => (
                <div
                  key={job._id}
                  className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl shadow-lg hover:-translate-y-1 transition flex justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold">{job.title}</h3>
                    <p className="text-gray-300">{job.company}</p>
                    <p className="text-sm text-gray-400">{job.location}</p>
                    {job.applied && (
                      <p className="text-green-400 font-semibold text-sm">
                        Applied
                      </p>
                    )}
                  </div>

                  {!job.applied && (
                    <button
                      onClick={() => dispatch(applyJob(job._id))}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-medium"
                    >
                      Mark Applied
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No saved jobs yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
