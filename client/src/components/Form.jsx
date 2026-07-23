import { useState } from "react";

const Form = ({ data, setData, triggerToast }) => {

  // --- Education Handlers ---
  // Update Education
  const handleEducationChange = (index, field, value) => {
    const updated = [...data.education];
    updated[index][field] = value;
    setData({ ...data, education: updated });
  };

  // Add an Empty Education
  const addEducation = () => {
    setData({
      ...data,
      education: [...data.education, { degree: "", school: "", year: "" }],
    });
  };

  // Remove Education
  const removeEducation = (index) => {
    const updated = data.education.filter((_, i) => i !== index);
    if(updated.length === 0) return
    setData({ ...data, education: updated });
  };

  // --- Experience Handlers ---
  
  // --- Section Toggles ---
  const toggleFresher = () => {
    setData({ ...data, isFresher: !data.isFresher });
  };

  // Update Experience
  const handleExperienceChange = (index, field, value) => {
    const updated = [...data.experience];
    updated[index][field] = value;
    setData({ ...data, experience: updated });
  };

  // Add Experience
  const addExperience = () => {
    setData({
      ...data,
      experience: [
        ...data.experience,
        { company: "", role: "", duration: "", description: "" }
      ],
    });
  };

  // Remove Experience
  const removeExperience = (index) => {
    const updated = data.experience.filter((_, i) => i !== index);
    setData({ ...data, experience: updated });
  };

  // --- Projects ---
  const handleProjectChange = (index, field, value) => {
    const updated = [...data.projects];
    updated[index][field] = value;
    setData({ ...data, projects: updated });
  };

  const handleBulletChange = (pIndex, bIndex, value) => {
    const updated = [...data.projects];
    updated[pIndex].description[bIndex] = value;
    setData({ ...data, projects: updated });
  };

  const addProject = () => {
    setData({
      ...data,
      projects: [
        ...data.projects,
        { title: "", tech: "", description: [""] }
      ],
    });
  };

  const removeProject = (index) => {
    if (data.projects.length === 1) return;

    const updated = data.projects.filter((_, i) => i !== index);
    setData({ ...data, projects: updated });
  };

  // - Bullet Points In Project -
  const addBullet = (index) => {
    const updated = [...data.projects];
    updated[index].description.push("");
    setData({ ...data, projects: updated });
  };

  const removeBullet = (pIndex, bIndex) => {
    const updated = [...data.projects];
    if (updated[pIndex].description.length === 1) return;
    updated[pIndex].description = updated[pIndex].description.filter(
      (_, i) => i !== bIndex
    );
    setData({ ...data, projects: updated });
  };

  // --- Skills ---
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    const value = skillInput.trim();
    if (value !== "" && !data.skills.includes(value)) {
      setData({
        ...data,
        skills: [...data.skills, value],
      });
    }
    setSkillInput("");
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (index) => {
    const updated = data.skills.filter((_, i) => i !== index);
    setData({ ...data, skills: updated });
  };

  // Handle Toggle and Popup Timer
  const handleFresherToggle = (e)=>{
    const isChecked = e.target.checked;
    setData({...data,isFresher: isChecked});

    // Trigger the parent's popup with a custom message
    const msg = isChecked
      ? "Fresher Mode On: Experience Section Hidden" 
      : "Fresher Mode Off: Experience Section Restored";
    triggerToast(msg);
  }

  return (
    <div>
      {/*  HEADER SECTION */}
      <div className="form-header">
        {/* 🔄 THE TOGGLE SWITCH */}
        <div className="fresher-switch-container">
          <span className="switch-label">
            {data.isFresher ? "Fresher Mode On" : "Fresher Mode Off"}
          </span>
          <label className="switch">
            <input type="checkbox" checked={data.isFresher} onChange={handleFresherToggle} />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* PERSONAL DETAILS */}
      <section className="form-card">
        <div className="card-header">
          <span className="icon">👤</span>
          <h3>Personal Information</h3>
        </div>
        <div className="grid-2">
          <div className="form-elem">
            <label>Full Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="John Doe"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="form-elem">
            <label>Email Address</label>
            <input
              className="form-control"
              type="email"
              placeholder="john@example.com"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="form-elem">
            <label>Phone Number</label>
            <input
              className="form-control"
              type="text"
              placeholder="+91 98765 43210"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          </div>
          <div className="form-elem">
            <label>Location</label>
            <input
              className="form-control"
              type="text"
              placeholder="Mumbai, India"
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
            />
          </div>
        </div>
        <div className="form-elem">
          <label>Professional Summary</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="A short brief about your career..."
            value={data.about}
            onChange={(e) => setData({ ...data, about: e.target.value })}
          />
        </div>
      </section>

      {/* EXPERIENCE (Hidden if Fresher Mode is ON) */}
      {!data.isFresher && (
        <section className="form-card animate-in">
          <div className="card-header">
            <span className="icon">💼</span>
            <h3>Work Experience</h3>
          </div>
          {data.experience.map((exp, index) => (
            <div key={index} className="cv-form-row" style={{ padding: "1.5rem", borderRadius: "8px" }}>
              <div className="grid-2">
                <input
                  className="form-control"
                  placeholder="Company Name"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                />
                <input
                  className="form-control"
                  placeholder="Role / Title"
                  value={exp.role}
                  onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
                />
              </div>
              <input
                className="form-control mt-2"
                placeholder="Duration (e.g. Jan 2023 - Present)"
                value={exp.duration}
                onChange={(e) => handleExperienceChange(index, "duration", e.target.value)}
              />
              <textarea
                className="form-control mt-2"
                style={{marginTop:"1.5rem"}}
                placeholder="Job Description"
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
              />
              <button className="remove-link" onClick={() => removeExperience(index)}>Remove Entry</button>
            </div>
          ))}
          <button className="add-btn-outline" onClick={addExperience}>+ Add Experience</button>
        </section>
      )}

      {/* PROJECTS */}
      <section className="form-card">
        <div className="card-header">
          <span className="icon">🚀</span>
          <h3>Projects</h3>
        </div>
        {data.projects.map((proj, pIndex) => (
          <div key={pIndex} className="repeater-item">
            <div className="grid-2">
              <input
                className="form-control"
                placeholder="Project Title"
                value={proj.title}
                onChange={(e) => handleProjectChange(pIndex, "title", e.target.value)}
              />
              <input
                className="form-control"
                placeholder="Tech Stack (React, Java, etc.)"
                value={proj.tech}
                onChange={(e) => handleProjectChange(pIndex, "tech", e.target.value)}
              />
            </div>
            
            <div className="bullet-section">
              <label className="sub-label">Project Details (Bullet Points)</label>
              {proj.description.map((bullet, bIndex) => (
                <div key={bIndex} className="bullet-input-row">
                  <input
                    className="form-control"
                    placeholder="Describe a feature or achievement"
                    value={bullet}
                    onChange={(e) => handleBulletChange(pIndex, bIndex, e.target.value)}
                  />
                  <button className="bullet-remove" onClick={() => removeBullet(pIndex, bIndex)}>×</button>
                </div>
              ))}
              <button className="add-bullet-btn" onClick={() => addBullet(pIndex)}>+ Add Point</button>
            </div>
            <button className="remove-link" onClick={() => removeProject(pIndex)}>Remove Project</button>
          </div>
        ))}
        <button className="add-btn-outline" onClick={addProject}>+ Add New Project</button>
      </section>

      {/* EDUCATION */}
      <section className="form-card">
        <div className="card-header">
          <span className="icon">🎓</span>
          <h3>Education</h3>
        </div>
        {data.education.map((edu, index) => (
          <div key={index} className="repeater-item">
            <div className="grid-2">
              <input
                className="form-control"
                placeholder="School / University"
                value={edu.school}
                onChange={(e) => handleEducationChange(index, "school", e.target.value)}
              />
              <input
                className="form-control"
                placeholder="Degree / Course"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
              />
            </div>
            <input
              className="form-control mt-2"
              placeholder="Year of Completion"
              value={edu.year}
              onChange={(e) => handleEducationChange(index, "year", e.target.value)}
            />
            <button className="remove-link" onClick={() => removeEducation(index)}>Remove Education</button>
          </div>
        ))}
        <button className="add-btn-outline" onClick={addEducation}>+ Add Education</button>
      </section>

      {/* SKILLS */}
      <section className="form-card">
        <div className="card-header">
          <span className="icon">🛠️</span>
          <h3>Skills & Expertise</h3>
        </div>
        <div style={{ display: "flex", gap: "10px", marginBottom: "1.5rem" }}>
          <input
            className="form-control"
            placeholder="Type a skill and press Add"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
          />
          <button className="repeater-add-btn"  onClick={addSkill}>+</button>
        </div>
        <div className="skills-tags-container">
          {data.skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
              <button className="removeSkill" onClick={() => removeSkill(index)}>×</button>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Form;