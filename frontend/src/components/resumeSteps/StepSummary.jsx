const StepSummary = ({ summary, setSummary, generateAISummary, summaryLoading }) => {
  return (
    <div
      className="py-8 px-8 bg-white rounded-2xl shadow-xl border border-gray-200 border-t-10"
      style={{ borderTopColor: "#2b7fff" }}
    >
      <p className="text-2xl font-bold text-gray-900">Professional Summary</p>

      <div className="flex justify-between items-center mt-1">
        <p className="text-sm text-gray-500">Generate an AI-powered summary based on your role.</p>

        <button
          onClick={generateAISummary}
          disabled={summaryLoading}
          className={`px-5 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition
            ${
              summaryLoading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
        >
          {summaryLoading ? (
            <span className="animate-spin w-4 h-4 border-t-2 border-white rounded-full"></span>
          ) : (
            "Generate with AI"
          )}
        </button>
      </div>

      <div className="relative mt-6">
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full px-4 pt-6 pb-2 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 min-h-40 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
        />
        <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
          Write your summary or generate an AI version
        </label>
      </div>
    </div>
  );
};

export default StepSummary;
