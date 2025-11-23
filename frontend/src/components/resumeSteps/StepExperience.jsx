import { useState } from "react";
import { Loader2 } from "lucide-react";
import { generateSummaryFromGemini } from "../../services/AIModel";

const StepExperience = ({ form, setForm }) => {
  const [loadingIndex, setLoadingIndex] = useState(null);

  const update = (i, field, value) => {
    const copy = [...form.experience];
    copy[i][field] = value;
    setForm({ ...form, experience: copy });
  };

  const add = () =>
    setForm({
      ...form,
      experience: [
        ...form.experience,
        { title: "", company: "", start: "", end: "", description: "" },
      ],
    });

  const remove = () =>
    setForm({
      ...form,
      experience: form.experience.slice(0, -1),
    });

  const generateExperienceSummary = async (index) => {
    try {
      setLoadingIndex(index);
      const prompt = `
Generate exactly 3 ATS-optimized bullet points for work experience.
Role: ${form.role}
Focus on measurable impact, achievements, tech used, teamwork, and performance improvement.
Each bullet must be 10-14 words, start with a strong action verb.
Do NOT use markdown, numbers, or dashes. Begin bullets with • only.
Do NOT include company name or Year.
`;
      const result = await generateSummaryFromGemini(prompt);
      const bullets = result
        .split("\n")
        .filter((line) => line.trim().startsWith("•"))
        .join("\n")
        .trim();

      setForm((prev) => {
        const updated = [...prev.experience];
        updated[index].description = bullets;
        return { ...prev, experience: updated };
      });
    } catch (error) {
      console.error("AI Work Exp Error:", error);
      alert("AI failed to generate experience summary");
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div
      className="py-8 px-8 bg-white rounded-2xl shadow-xl border border-gray-200 border-t-10"
      style={{ borderTopColor: "#2b7fff" }}
    >
      <p className="text-2xl font-bold text-gray-900">Work Experience</p>
      <p className="text-sm text-gray-500 mt-1">Add prior professional experience.</p>

      {form.experience.map((exp, i) => (
        <div
          key={i}
          className="bg-gray-50 rounded-2xl p-5 mt-6 border border-gray-200"
        >
          <div className="relative mb-5">
            <input
              value={exp.title}
              onChange={(e) => update(i, "title", e.target.value)}
              className="w-full px-4 pt-5 pb-2 rounded-xl bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />
            <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
              Job Title
            </label>
          </div>

          <div className="relative mb-5">
            <input
              value={exp.company}
              onChange={(e) => update(i, "company", e.target.value)}
              className="w-full px-4 pt-5 pb-2 rounded-xl bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />
            <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
              Company
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                value={exp.start}
                onChange={(e) => update(i, "start", e.target.value)}
                className="w-full px-4 pt-5 pb-2 rounded-xl bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
              />
              <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
                Start Year
              </label>
            </div>

            <div className="relative">
              <input
                value={exp.end}
                onChange={(e) => update(i, "end", e.target.value)}
                className="w-full px-4 pt-5 pb-2 rounded-xl bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
              />
              <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
                End Year
              </label>
            </div>
          </div>

          <div className="relative mt-6">
            <textarea
              value={exp.description}
              onChange={(e) => update(i, "description", e.target.value)}
              className="w-full px-4 pt-6 pb-2 rounded-xl bg-white border border-gray-300 text-gray-900 min-h-[110px] focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />
            <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
              Description / Responsibilities
            </label>
          </div>

          <button
            onClick={() => generateExperienceSummary(i)}
            disabled={loadingIndex === i}
            className={`px-4 py-2 mt-4 rounded-xl text-sm font-medium flex items-center gap-2 transition
            ${
              loadingIndex === i
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loadingIndex === i ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating
              </>
            ) : (
              "Generate AI Experience Summary"
            )}
          </button>
        </div>
      ))}

      <div className="flex gap-3 mt-6">
        <button
          onClick={add}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Add Experience
        </button>

        {form.experience.length > 1 && (
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

export default StepExperience;
