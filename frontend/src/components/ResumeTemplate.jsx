/* FINAL PROFESSIONAL RESUME TEMPLATE WITH CLICKABLE ICONS */

const ResumeTemplate = ({ data, summary }) => {
  const theme = "#1e3a8a"; // deep blue

  // Helper validation functions
  const hasExperience = data.experience?.some(
    (exp) => exp.title || exp.company || exp.description
  );

  const hasProjects = data.projects?.some(
    (proj) => proj.title || proj.desc || proj.link
  );

  const hasEducation = data.education?.some(
    (edu) => edu.school || edu.degree
  );

  return (
    <div
      id="resume-pdf"
      className="bg-white text-black text-sm w-[700px] p-8 shadow-md border-t-12"
      style={{ borderColor: theme }}
    >
      {/* ================= HEADER ================= */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold capitalize" style={{ color: theme }}>
          {data.title}
        </h1>

        <p className="text-lg font-semibold capitalize">{data.role}</p>
        <p className="text-xs font-medium mt-2">{data.address}</p>

        <div className="flex justify-between text-xs font-medium mt-1">
          <p>{data.contact}</p>
          <p>{data.email || ""}</p>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex justify-center gap-4 mt-2">
          {data.links.linkedin && (
            <a href={data.links.linkedin} target="_blank" rel="noopener noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                className="w-5 h-5"
              />
            </a>
          )}

          {data.links.github && (
            <a href={data.links.github} target="_blank" rel="noopener noreferrer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                className="w-5 h-5"
              />
            </a>
          )}

          {data.links.portfolio && (
            <a href={data.links.portfolio} target="_blank" rel="noopener noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Globe_icon.svg/2048px-Globe_icon.svg.png"
                className="w-5 h-5"
              />
            </a>
          )}
        </div>
      </div>

      <hr style={{ borderColor: theme }} className="border-2 mb-4" />

      {/* ================= SUMMARY ================= */}
      {summary && (
        <div className="mb-5">
          <h2 className="text-lg font-bold" style={{ color: theme }}>
            Summary
          </h2>
          <hr className="border mb-2" style={{ borderColor: theme }} />
          <p className="text-xs leading-relaxed">{summary}</p>
        </div>
      )}

      {/* ================= SKILLS ================= */}
      {data.skills && String(data.skills).trim().length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold" style={{ color: theme }}>
            Skills
          </h2>
          <hr className="border mb-2" style={{ borderColor: theme }} />

          <div className="grid grid-cols-2 gap-y-1 text-xs">
            {(Array.isArray(data.skills)
              ? data.skills.join(",").split(",")
              : data.skills.split(",")
            ).map((skill, i) => (
              <p key={i} className="capitalize">
                • {skill.trim()}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* ================= EXPERIENCE ================= */}
      {hasExperience && (
        <div className="mb-5">
          <h2 className="text-lg font-bold" style={{ color: theme }}>
            Work Experience
          </h2>
          <hr className="border mb-2" style={{ borderColor: theme }} />

          {data.experience.map(
            (exp, i) =>
              (exp.title || exp.company || exp.description) && (
                <div key={i} className="mb-3">
                  <p className="font-bold text-sm" style={{ color: theme }}>
                    {exp.title}
                  </p>

                  <div className="flex justify-between text-xs">
                    <span className="font-semibold">{exp.company}</span>
                    <span>{exp.start} - {exp.end}</span>
                  </div>

                  <p className="text-xs mt-1 leading-relaxed">{exp.description}</p>
                </div>
              )
          )}
        </div>
      )}

      {/* ================= PROJECTS ================= */}
      {hasProjects && (
        <div className="mb-5">
          <h2 className="text-lg font-bold" style={{ color: theme }}>
            Projects
          </h2>
          <hr className="border mb-2" style={{ borderColor: theme }} />

          {data.projects.map(
            (proj, i) =>
              (proj.title || proj.desc || proj.link) && (
                <div key={i} className="mb-3">
                  <p className="font-bold text-sm" style={{ color: theme }}>
                    {proj.title}
                  </p>

                  {proj.link && (
                    <a href={proj.link} target="_blank" className="text-xs underline">
                      {proj.link}
                    </a>
                  )}

                  <p className="text-xs mt-1 leading-relaxed">{proj.desc}</p>
                </div>
              )
          )}
        </div>
      )}

      {/* ================= EDUCATION ================= */}
      {hasEducation && (
        <div className="mb-5">
          <h2 className="text-lg font-bold" style={{ color: theme }}>
            Education
          </h2>
          <hr className="border mb-2" style={{ borderColor: theme }} />

          {data.education.map(
            (edu, i) =>
              (edu.school || edu.degree) && (
                <div key={i} className="mb-3">
                  <p className="font-bold text-sm" style={{ color: theme }}>
                    {edu.school}
                  </p>
                  <p className="text-xs font-semibold">{edu.degree}</p>
                  <p className="text-xs">
                    {edu.start} - {edu.end}
                  </p>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeTemplate;
