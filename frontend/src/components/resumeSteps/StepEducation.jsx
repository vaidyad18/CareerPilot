const StepEducation = ({ form, setForm }) => {
  const update = (i, field, value) => {
    const copy = [...form.education];
    copy[i][field] = value;
    setForm({ ...form, education: copy });
  };

  const add = () =>
    setForm({
      ...form,
      education: [...form.education, { school: "", degree: "", start: "", end: "" }],
    });

  const remove = () =>
    setForm({
      ...form,
      education: form.education.slice(0, -1),
    });

  return (
    <div
      className="py-8 px-8 bg-white rounded-2xl shadow-xl border border-gray-200 border-t-10"
      style={{ borderTopColor: "#2b7fff" }}
    >
      <p className="text-2xl font-bold text-gray-900">Education</p>
      <p className="text-sm text-gray-500 mt-1">Add your educational background.</p>

      {form.education.map((edu, i) => (
        <div
          key={i}
          className="bg-gray-50 rounded-2xl p-5 mt-6 border border-gray-200"
        >
          <div className="relative mb-5">
            <input
              value={edu.school}
              onChange={(e) => update(i, "school", e.target.value)}
              className="w-full px-4 pt-5 pb-2 rounded-xl bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />
            <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
              School or College
            </label>
          </div>

          <div className="relative mb-5">
            <input
              value={edu.degree}
              onChange={(e) => update(i, "degree", e.target.value)}
              className="w-full px-4 pt-5 pb-2 rounded-xl bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />
            <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
              Degree
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                value={edu.start}
                onChange={(e) => update(i, "start", e.target.value)}
                className="w-full px-4 pt-5 pb-2 rounded-xl bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
              />
              <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
                Start Year
              </label>
            </div>

            <div className="relative">
              <input
                value={edu.end}
                onChange={(e) => update(i, "end", e.target.value)}
                className="w-full px-4 pt-5 pb-2 rounded-xl bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
              />
              <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
                End Year
              </label>
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-3 mt-6">
        <button
          onClick={add}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Add Education
        </button>

        {form.education.length > 1 && (
          <button
            onClick={remove}
            className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default StepEducation;
