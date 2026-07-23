import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TemplateSelector.css";
import Navbar from "../components/Navbar";

const TEMPLATE_DESIGNS = [
  {
    id: "template1",
    name: "Classic Slate",
    desc: "Clean, traditional single-column alignment optimal for Technical, Engineering, and Developer profiles.",
    tags: ["TECH", "ACADEMIC"]
  },
  {
    id: "template2",
    name: "Executive Minimalist",
    desc: "Elegant typographic layout tracking dense milestone timelines. Perfect for Corporate Management and Leadership.",
    tags: ["MANAGEMENT", "TECH"]
  },
  {
    id: "template3",
    name: "Research Scholar",
    desc: "Symmetric structural layout engineered explicitly for rich multi-line descriptions and reference items.",
    tags: ["ACADEMIC"]
  }
];

const TemplateSelector = ({token, handleLogout}) => {
  const [selectedDomain, setSelectedDomain] = useState("TECH");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  const handleLaunchBuilder = (templateId) => {
    setSelectedTemplate(templateId);
    
    // Pass choices forward onto the Workspace Builder state route
    navigate("/builder", { 
      state: { 
        domain: selectedDomain, 
        templateId: templateId 
      } 
    });
  };

  return (
    <>
      <Navbar token={token} onLogout={handleLogout} />
      <div className="template-selector-page">
        <div className="selector-container">
          
          <header className="selector-header">
            <h1>Configure Your Target Blueprint</h1>
            <p>Select your target career track to prepare tailored resume building blocks.</p>
          </header>

          {/* STEP 1: Domain Focus Filter */}
          <div className="domain-options-group">
            <button 
              className={`btn-domain-toggle ${selectedDomain === "TECH" ? "active" : ""}`}
              onClick={() => setSelectedDomain("TECH")}
            >
              Engineering & Tech
            </button>
            <button 
              className={`btn-domain-toggle ${selectedDomain === "MANAGEMENT" ? "active" : ""}`}
              onClick={() => setSelectedDomain("MANAGEMENT")}
            >
              Corporate & Management
            </button>
            <button 
              className={`btn-domain-toggle ${selectedDomain === "ACADEMIC" ? "active" : ""}`}
              onClick={() => setSelectedDomain("ACADEMIC")}
            >
              Academic & Research
            </button>
          </div>

          {/* STEP 2: Structural Template Engine Cards */}
          <div className="template-grid">
            {TEMPLATE_DESIGNS.map((tmpl) => {
              const isSelected = selectedTemplate === tmpl.id;
              const isRecommended = tmpl.tags.includes(selectedDomain);

              return (
                <div 
                  key={tmpl.id} 
                  className={`template-card ${isSelected ? "selected" : ""}`}
                  style={{ borderTop: isRecommended ? "4px solid #2563eb" : "1px solid #e2e8f0" }}
                >
                  {/* Visual Thumbnail Placeholder */}
                  <div className="template-thumbnail">
                    {isRecommended && (
                      <span style={{
                        position: 'absolute', top: '8px', left: '8px',
                        backgroundColor: '#2563eb', color: 'white',
                        fontSize: '1.09rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold'
                      }}>
                        Recommended
                      </span>
                    )}
                  </div>

                  <div className="template-details">
                    <div>
                      <h3>{tmpl.name}</h3>
                      <p>{tmpl.desc}</p>
                    </div>
                    
                    <button 
                      className="btn-select-template"
                      onClick={() => handleLaunchBuilder(tmpl.id)}
                    >
                      {isSelected ? "Selected ✓" : "Use This Template"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
};

export default TemplateSelector;