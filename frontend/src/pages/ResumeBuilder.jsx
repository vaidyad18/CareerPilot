import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { createResume } from "../features/resume/resumeActions";
import Navbar from "../components/Navbar";

import ResumeTemplate from "../components/ResumeTemplate";
import ResumePDF from "../components/pdf/ResumePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

import StepPersonal from "../components/resumeSteps/StepPersonal";
import StepSummary from "../components/resumeSteps/StepSummary";
import StepExperience from "../components/resumeSteps/StepExperience";
import StepProjects from "../components/resumeSteps/StepProjects";
import StepEducation from "../components/resumeSteps/StepEducation";
import StepSkills from "../components/resumeSteps/StepSkills";

import { generateSummaryFromGemini } from "../services/AIModel";
import { toast } from "sonner";

const ResumeBuilder = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [step, setStep] = useState(1);
  const [summary, setSummary] = useState("");
  const [aiSummaries, setAiSummaries] = useState([]);
  const [summaryLoading, setSummaryLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    role: "",
    contact: "",
    address: "",
    skills: "",
    links: { linkedin: "", github: "", portfolio: "" },
    experience: [
      { title: "", company: "", start: "", end: "", description: "" },
    ],
    projects: [{ title: "", link: "", desc: "" }],
    education: [{ school: "", degree: "", start: "", end: "" }],
  });

  // Load when editing existing resume
  useEffect(() => {
    const loadResume = async () => {
      try {
        const res = await api.get(`/resumes/${id}`);
        setForm(res.data.resume);
        setSummary(res.data.resume.summary);
      } catch (err) {
        console.log("Error loading resume", err);
      }
    };
    if (id) loadResume();
  }, [id]);

  // Generate AI summary
  const generateAISummary = async () => {
    try {
      setSummaryLoading(true);
      const prompt = `
        Generate exactly 3 resume summary options for role: ${form.role}.
        Write 3-4 lines each. ATS friendly. No markdown. No numbering.
        Separate each version using ###
      `;
      const response = await generateSummaryFromGemini(prompt);
      const options = response.split("###").map((s) => s.trim()).filter(Boolean);
      setAiSummaries(options);
    } catch (error) {
      toast.error("AI failed to generate summary");
    } finally {
      setSummaryLoading(false);
    }
  };

  // Save resume with toast feedback
  const saveResume = async () => {
    try {
      dispatch(createResume({ ...form, summary }));
      toast.success(id ? "Resume Updated Successfully" : "Resume Saved Successfully");
    } catch (err) {
      toast.error("Failed to save resume");
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="print:hidden">
        <Navbar />
      </div>

      <div
        className={`w-full px-10 mx-auto py-5 grid gap-2 ${
          step === 7 ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
        }`}
      >
        {/* LEFT SIDE FORM */}
        {step !== 7 && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-4 py-8 shadow-xl">
            <p className="text-gray-400 mb-5 text-sm tracking-wide">
              Step {step} of 7
            </p>

            {step === 1 && <StepPersonal form={form} setForm={setForm} />}
            {step === 2 && (
              <StepSummary
                form={form}
                summary={summary}
                setSummary={setSummary}
                generateAISummary={generateAISummary}
                summaryLoading={summaryLoading}
              />
            )}
            {step === 3 && <StepExperience form={form} setForm={setForm} />}
            {step === 4 && <StepProjects form={form} setForm={setForm} />}
            {step === 5 && <StepEducation form={form} setForm={setForm} />}
            {step === 6 && <StepSkills form={form} setForm={setForm} />}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
                >
                  Back
                </button>
              )}
              {step < 7 && (
                <button
                  onClick={() => {
                    setAiSummaries([]);
                    setStep(step + 1);
                  }}
                  className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 ml-auto transition"
                >
                  Next
                </button>
              )}
            </div>

            {aiSummaries.length > 0 && (
              <div className="mt-8">
                <p className="text-lg font-semibold mb-4">AI Suggestions</p>
                <div className="grid gap-4">
                  {aiSummaries.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setSummary(item)}
                      className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition"
                    >
                      <p className="text-sm text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* RIGHT SIDE PREVIEW */}
        {step !== 7 && (
          <div className="sticky top-10 print:hidden">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl backdrop-blur-xl bg-white p-4">
              <ResumeTemplate data={form} summary={summary} />
            </div>
          </div>
        )}

        {/* STEP 7 - DOWNLOAD */}
        {step === 7 && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">🎉 Resume Ready</h2>
            <p className="text-gray-400 mt-2">
              Download your ATS friendly resume below
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <PDFDownloadLink
                document={<ResumePDF data={form} summary={summary} />}
                fileName={`${form.title || "Resume"}.pdf`}
              >
                {({ loading }) => (
                  <button className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium">
                    {loading ? "Generating PDF..." : "Download PDF"}
                  </button>
                )}
              </PDFDownloadLink>

              <button
                onClick={saveResume}
                className="px-6 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium"
              >
                {id ? "Update Resume" : "Save Resume"}
              </button>
            </div>

            <div className="mt-6 flex justify-center">
              <div className="w-[900px] flex justify-center bg-white text-black p-4">
                <ResumeTemplate data={form} summary={summary} />
              </div>
            </div>

            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 mt-6 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;
