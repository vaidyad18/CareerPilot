import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ResumeTemplate from "../components/ResumeTemplate";
import ResumePDF from "../components/pdf/ResumePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import api from "../services/api";

const ViewResume = () => {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await api.get(`/resumes/${resumeId}`);
        setResumeInfo(res.data);  // response already is resume object
      } catch (error) {
        console.log(error);
      }
    };

    fetchResume();
  }, [resumeId]);

  return (
    <div className="min-h-screen bg-black">
      <div id="noprint">
        <Navbar />
        <p className="text-center text-xl text-white font-semibold mt-6">
          Your Resume is Ready 🎉
        </p>
        <p className="text-center text-gray-300 text-sm">
          Click the button below to download your ATS-friendly resume.
        </p>

        {resumeInfo && (
          <div className="flex justify-center mt-6">
            <PDFDownloadLink
              document={<ResumePDF data={resumeInfo} summary={resumeInfo.summary} />}
              fileName={`${resumeInfo.title || "Resume"}.pdf`}
            >
              {({ loading }) => (
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg">
                  {loading ? "Generating PDF..." : "Download PDF"}
                </button>
              )}
            </PDFDownloadLink>
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto bg-white p-6 my-10 shadow-xl">
        {resumeInfo ? (
          <ResumeTemplate data={resumeInfo} summary={resumeInfo.summary} />
        ) : (
          <p className="text-center text-gray-500">Loading resume...</p>
        )}
      </div>
    </div>
  );
};

export default ViewResume;
