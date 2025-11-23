import { useState } from "react";
import { generateSummaryFromGemini } from "../../services/AIModel";
import { Loader2 } from "lucide-react";

const StepProjects = ({ form, setForm }) => {
  const [loadingIndex, setLoadingIndex] = useState(null);

  const update = (i, field, value) => {
    const copy = [...form.projects];
    copy[i][field] = value;
    setForm({ ...form, projects: copy });
  };

  const add = () =>
    setForm({
      ...form,
      projects: [...form.projects, { title: "", link: "", desc: "" }],
    });

  const remove = () =>
    setForm({
      ...form,
      projects: form.projects.slice(0, -1),
    });

  const generateProjectSummary = async (index) => {
    try {
      setLoadingIndex(index);

      const prompt = `
Generate exactly 3 ATS-friendly bullet points describing a project for the role: ${form.title}.
Each bullet must be 10-14 words, start with an action verb, highlight measurable impact and tech used.
Avoid project name or personal pronouns.
Return ONLY bullet lines like:
• ...
• ...
• ...
      `;

      const response = await generateSummaryFromGemini(prompt);

      const bullets = response
        .split("\n")
        .filter((line) => line.trim().startsWith("•"))
        .join("\n")
        .trim();

      setForm((prev) => {
        const copy = [...prev.projects];
        copy[index].desc = bullets;
        return { ...prev, projects: copy };
      });
    } catch (error) {
      console.error("AI Project Error:", error);
      alert("AI failed to generate project summary");
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div
      className="py-8 px-8 bg-white rounded-2xl shadow-xl border border-gray-200 border-t-10"
      style={{ borderTopColor: "#2b7fff" }}
    >
      <p className="text-2xl font-bold text-gray-900">Projects</p>
      <p className="text-sm text-gray-500 mt-1">Add key projects you have worked on.</p>

      {form.projects.map((proj, i) => (
        <div
          key={i}
          className="bg-gray-50 rounded-2xl p-5 mt-6 border border-gray-200"
        >
          <div className="relative mb-5">
            <input
              value={proj.title}
              onChange={(e) => update(i, "title", e.target.value)}
              className="w-full px-4 pt-5 pb-2 rounded-xl bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />
            <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
              Project Title
            </label>
          </div>

          <div className="relative mb-5">
            <input
              value={proj.link}
              onChange={(e) => update(i, "link", e.target.value)}
              className="w-full px-4 pt-5 pb-2 rounded-xl bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />
            <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
              Project Link (optional)
            </label>
          </div>

          <div className="relative mt-6">
            <textarea
              value={proj.desc}
              onChange={(e) => update(i, "desc", e.target.value)}
              className="w-full px-4 pt-6 pb-2 rounded-xl bg-white border border-gray-300 text-gray-900 min-h-[110px] focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />
            <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
              Description / Key Impact
            </label>
          </div>

          <button
            onClick={() => generateProjectSummary(i)}
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
              "Generate AI Project Summary"
            )}
          </button>
        </div>
      ))}

      <div className="flex gap-3 mt-6">
        <button
          onClick={add}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Add Project
        </button>

        {form.projects.length > 1 && (
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

export default StepProjects;
