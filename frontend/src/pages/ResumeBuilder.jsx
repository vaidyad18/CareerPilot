import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
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
import { ArrowLeft, ArrowRight, Sparkles, FileDown, Rocket, CheckCircle2, Layout } from "lucide-react";

const ResumeBuilder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const saveResume = async () => {
    try {
      dispatch(createResume({ ...form, summary }));
      toast.success(id ? "Profile Updated Successfully" : "Profile Synthesized Successfully");
    } catch (err) {
      toast.error("Failed to save resume");
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="max-w-[1600px] mx-auto px-6 pt-28 pb-10">
        <div className={`grid gap-12 ${step === 7 ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-12"}`}>
          {step !== 7 && (
            <div className="lg:col-span-5 xl:col-span-4 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
               <header className="space-y-2">
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Resume Configuration</p>
                  </div>
                  <h1 className="text-3xl font-black text-white">Synthesizer <span className="text-blue-500">v4.0</span></h1>
               </header>

               <div className="glass p-8 rounded-[32px] border-white/5 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                     <div 
                        className="h-full bg-blue-500 transition-all duration-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
                        style={{ width: `${(step / 6) * 100}%` }}
                     />
                  </div>
                  
                  <div className="flex items-center justify-between mb-8">
                     <p className="text-xs font-bold text-gray-500">
                        Module <span className="text-white">0{step}</span> <span className="mx-1 text-gray-800">/</span> 06
                     </p>
                     <div className="flex gap-1">
                        {[1, 2, 3, 4, 5, 6].map(s => (
                           <div key={s} className={`w-1.5 h-1.5 rounded-full transition-colors ${s <= step ? 'bg-blue-500' : 'bg-white/10'}`} />
                        ))}
                     </div>
                  </div>

                  <div className="min-h-[400px]">
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
                  </div>

                  <div className="flex justify-between mt-10">
                    {step > 1 ? (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-white transition-colors"
                      >
                        <ArrowLeft size={16} /> Previous Module
                      </button>
                    ) : <div />}
                    
                    {step < 7 && (
                      <button
                        onClick={() => {
                          setAiSummaries([]);
                          setStep(step + 1);
                        }}
                        className="btn-primary flex items-center gap-2 !py-3 !px-8"
                      >
                        {step === 6 ? "Finalize Analysis" : "Next Module"} <ArrowRight size={18} />
                      </button>
                    )}
                  </div>

                  {aiSummaries.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-white/5">
                      <div className="flex items-center gap-2 mb-4">
                         <Sparkles size={16} className="text-blue-400" />
                         <p className="text-sm font-black uppercase tracking-widest text-gray-400">AI Intelligence</p>
                      </div>
                      <div className="grid gap-3">
                        {aiSummaries.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => {
                               setSummary(item);
                               toast.info("Summary injected");
                            }}
                            className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10 cursor-pointer transition-all group"
                          >
                            <p className="text-xs leading-relaxed text-gray-400 group-hover:text-gray-200 transition-colors uppercase font-medium line-clamp-3">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
               </div>
            </div>
          )}

          {step !== 7 && (
            <div className="lg:col-span-7 xl:col-span-8 sticky top-10 print:hidden animate-in fade-in slide-in-from-right-4 duration-700">
               <div className="bg-white rounded-[40px] shadow-2xl p-8 xl:p-14 overflow-hidden relative group">
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-surface/5 text-surface/20 text-[10px] font-black uppercase tracking-[0.5em] opacity-10 pointer-events-none">
                     LIVE FEED PREVIEW
                  </div>
                  <div className="transform scale-[0.85] xl:scale-90 origin-top">
                     <ResumeTemplate data={form} summary={summary} />
                  </div>
               </div>
            </div>
          )}

          {step === 7 && (
            <div className="max-w-4xl mx-auto text-center animate-in zoom-in-95 duration-500">
               <div className="inline-flex p-6 rounded-[40px] bg-blue-600/10 text-blue-400 mb-8 border border-blue-500/20">
                  <CheckCircle2 size={64} />
               </div>
               <h2 className="text-5xl font-black text-white mb-4">Synthesis <span className="gradient-text">Complete</span></h2>
               <p className="text-gray-400 text-lg max-w-xl mx-auto mb-12">
                  Your professional blueprint has been fully indexed and optimized for global hiring markets.
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto mb-16">
                  <PDFDownloadLink
                    document={<ResumePDF data={form} summary={summary} />}
                    fileName={`${form.title || "Resume"}.pdf`}
                    className="w-full"
                  >
                    {({ loading }) => (
                      <button className="w-full btn-primary !py-5 flex items-center justify-center gap-2">
                        {loading ? "Synthesizing PDF..." : <><FileDown size={20} /> Export PDF</>}
                      </button>
                    )}
                  </PDFDownloadLink>

                  <button
                    onClick={saveResume}
                    className="w-full p-5 rounded-3xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-black uppercase tracking-widest text-sm hover:bg-emerald-500 hover:text-white transition-all transition-colors flex items-center justify-center gap-2"
                  >
                    <Rocket size={20} /> Deploy Update
                  </button>
               </div>

               <div className="glass p-2 rounded-[40px] border-white/5 shadow-2x relative overflow-hidden inline-block text-left mb-12">
                  <div className="absolute top-8 right-8 pointer-events-none">
                     <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                        FINAL OUTPUT
                     </div>
                  </div>
                  <div className="bg-white p-12 xl:p-20 shadow-inner rounded-[38px] w-full max-w-[900px]">
                     <ResumeTemplate data={form} summary={summary} />
                  </div>
               </div>

               <div className="flex items-center justify-center gap-8">
                  <button
                    onClick={() => setStep(6)}
                    className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-white transition-colors"
                  >
                    <ArrowLeft size={16} /> Return to Construction
                  </button>
                  <div className="h-4 w-[1px] bg-white/10" />
                  <div className="flex items-center gap-2 text-gray-700">
                     <Layout size={16} />
                     <span className="text-xs font-black uppercase tracking-widest">v4.0 Final Stable</span>
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResumeBuilder;
