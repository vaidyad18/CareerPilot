import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ResumeTemplate from "../components/ResumeTemplate";
import ResumePDF from "../components/pdf/ResumePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import api from "../services/api";
import { FileDown, CheckCircle2, Share2, Layout, ArrowLeft } from "lucide-react";

const ViewResume = () => {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await api.get(`/resumes/${resumeId}`);
        setResumeInfo(res.data.resume || res.data); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchResume();
  }, [resumeId]);

  return (
    <div className="min-h-screen bg-surface pb-24">
      <div className="print:hidden">
        <Navbar />
        
        <header className="max-w-7xl mx-auto px-6 pt-28 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div className="space-y-4">
              <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
                 <ArrowLeft size={16} /> Back to Terminal
              </Link>
              <h1 className="text-4xl font-black text-white flex items-center gap-3">
                 Resume <span className="gradient-text">Engineered</span>
                 <CheckCircle2 className="text-emerald-500" size={32} />
              </h1>
              <p className="text-gray-400 font-medium">Your professional profile has been synthesized and is ready for deployment.</p>
           </div>

           <div className="flex items-center gap-3">
              {resumeInfo && (
                <PDFDownloadLink
                  document={<ResumePDF data={resumeInfo} summary={resumeInfo.summary} />}
                  fileName={`${resumeInfo.title || "Resume"}.pdf`}
                >
                  {({ loading }) => (
                    <button className="btn-primary flex items-center gap-2 !px-8">
                      {loading ? "Synthesizing..." : <><FileDown size={18} /> Download PDF</>}
                    </button>
                  )}
                </PDFDownloadLink>
              )}
              <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                 <Share2 size={20} />
              </button>
           </div>
        </header>
      </div>

      <main className="max-w-5xl mx-auto px-6 pt-8">
        <div className="glass p-2 rounded-[40px] border-white/5 shadow-2xl overflow-hidden relative">
           <div className="bg-white p-12 md:p-20 shadow-inner rounded-[38px] min-h-[1000px]">
             {resumeInfo ? (
               <ResumeTemplate data={resumeInfo} summary={resumeInfo.summary} />
             ) : (
               <div className="flex flex-col items-center justify-center py-48 gap-4">
                  <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Retrieving Data...</p>
               </div>
             )}
           </div>

           {/* Decorative elements */}
           <div className="absolute top-8 right-8 print:hidden">
              <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                 ATS Optimized
              </div>
           </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 print:hidden">
           <div className="flex items-center gap-3 text-gray-600">
              <Layout size={18} />
              <span className="text-sm font-medium">Standard A4 Layout</span>
           </div>
        </div>
      </main>
    </div>
  );
};

export default ViewResume;
