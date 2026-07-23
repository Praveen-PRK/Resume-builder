import "./Template1.css";

const Template1 = ({ data }) => {
  // Helper to check if a value exists or return placeholder class
  const getVal = (val, placeholder) => val || placeholder;
  const getCls = (val) => (!val ? "placeholder-text" : "");

  return (
    <div className="resume-paper">
      {/* HEADER SECTION */}
      <header className="resume-header">
        <h1 className={getCls(data.name)}>{getVal(data.name, "YOUR NAME")}</h1>
        <div className="contact-info">
          <span className={getCls(data.email)}>{getVal(data.email, "email@example.com")}</span>
          <span className="separator">|</span>
          <span className={getCls(data.phone)}>{getVal(data.phone, "+91 00000 00000")}</span>
          <span className="separator">|</span>
          <span className={getCls(data.address)}>{getVal(data.address, "City, Country")}</span>
        </div>
      </header>

      <div className="resume-body">
        {/* ABOUT / SUMMARY */}
        <section className="resume-section">
          <h2 className="section-title">Professional Summary</h2>
          <p className={`about-text ${getCls(data.about)}`}>
            {getVal(data.about, "A brief description of your professional background, key achievements, and career goals. This helps recruiters understand your value proposition quickly.")}
          </p>
        </section>

        {/* EXPERIENCE */}
        {/* Only show Experience if NOT a fresher OR if they actually typed something */}
        {!data.isFresher && (
          <section className="resume-section">
            <h2 className="section-title">Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="item-header">
                  <strong className={getCls(exp.role)}>{getVal(exp.role, "Job Title")}</strong>
                  <span className={getCls(exp.duration)}>{getVal(exp.duration, "2024 - Present")}</span>
                </div>
                <div className={`company-name ${getCls(exp.company)}`}>
                  {getVal(exp.company, "Company Name / Location")}
                </div>
                <p className={`item-desc ${getCls(exp.description)}`}>
                  {getVal(exp.description, "Describe your responsibilities and achievements in this role.")}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* PROJECTS */}
        <section className="resume-section">
          <h2 className="section-title">
            {data.isFresher ? "Academic & Personal Projects" : "Projects"}
          </h2>
          {data.projects.map((proj, index) => (
            <div key={index} className="project-item">
              <div className="item-header">
                <strong className={getCls(proj.title)}>{getVal(proj.title, "Project Title")}</strong>
                <span className={`tech-stack ${getCls(proj.tech)}`}>{getVal(proj.tech, "React, Node.js, Java")}</span>
              </div>
              <ul className="project-bullets">
                {proj.description.map((bullet, i) => (
                  <li key={i} className={getCls(bullet)}>
                    {getVal(bullet, "Key feature or achievement of this project.")}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* EDUCATION & SKILLS (Two Column Row) */}
        <div className="resume-row">
          <section className="resume-section education-col">
            <h2 className="section-title">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="education-item">
                <strong className={getCls(edu.degree)}>{getVal(edu.degree, "Degree Name")}</strong>
                <div className={getCls(edu.school)}>{getVal(edu.school, "University/School")}</div>
                <div className={`year ${getCls(edu.year)}`}>{getVal(edu.year, "Year of Passing")}</div>
              </div>
            ))}
          </section>

          <section className="resume-section skills-col">
            <h2 className="section-title">Skills</h2>
            <div className="skills-container">
              {data.skills.length > 0 ? (
                data.skills.map((skill, index) => (
                  <span key={index} className="skill-badge">{skill}</span>
                ))
              ) : (
                <>
                  <span className="skill-badge placeholder-text">Skill 1</span>
                  <span className="skill-badge placeholder-text">Skill 2</span>
                  <span className="skill-badge placeholder-text">Skill 3</span>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Template1;