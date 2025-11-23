const StepSkills = ({ form, setForm }) => {
  const updateSkill = (value) => {
    setForm({ ...form, skills: value });
  };

  return (
    <div
      className="py-8 px-8 bg-white rounded-2xl shadow-xl border border-gray-200 border-t-10"
      style={{ borderTopColor: "#2b7fff" }}
    >
      <p className="text-2xl font-bold text-gray-900">Skills</p>
      <p className="text-sm text-gray-500 mt-1">
        Enter skills separated by commas.
      </p>

      <div className="relative mt-6">
        <textarea
          value={form.skills}
          onChange={(e) => updateSkill(e.target.value)}
          className="w-full px-4 pt-6 pb-2 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 min-h-[140px] focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
        />
        <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
          Example: JavaScript, React, Node.js, MongoDB
        </label>
      </div>
    </div>
  );
};

export default StepSkills;
