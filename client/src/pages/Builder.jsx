import { useState } from "react";
import { useParams } from "react-router-dom";
import Form from "../components/Form";
import ResumePreview from "../components/ResumePreview";
import html2pdf from "html2pdf.js";
import axios from "axios";
import { initialEmptyState } from "../utils/constants";
import { useEffect } from "react";
import VersionDropdown from "../components/VersionDropdown";
import Navbar from "../components/Navbar";
import StrengthMeter from "../components/StrengthMeter";

const Builder = ({token, handleLogout}) => {
  // const [data, setData] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   address: "",
  //   about: "",
  //   isFresher: false,
  //   skills: [],

  //   education: [
  //     { degree: "", school: "", year: "" }
  //   ],

  //   experience: [
  //     { company: "", role: "", duration: "", description: "" }
  //   ],
  //   projects: [
  //     {
  //       title: "",
  //       tech: "",
  //       description: [""],
  //     }
  //   ]
  // });


  const { id } = useParams();
  const [resumeId, setResumeId] = useState(id || null);
  const [title, setTitle] = useState("Untitled Resume");
  const [fullResume, setFullResume] = useState(null); // Stores the whole DB object
  const [data, setData] = useState(null); // Start as null until loaded
  const [activeVersionIndex, setActiveVersionIndex] = useState(0); // Tracks which version is on screen

  // Sidebar state (For Versions)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // FETCH DATA FROM DATABASE
  useEffect(() => {
    if (id) {
      const fetchResume = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/resumes/${id}`, {
          headers: { "auth-token": token }
        });
        setFullResume(res.data);
        setTitle(res.data.title);
        // Load the LATEST version by default
        const latestIndex = res.data.versions.length - 1;
        setData(res.data.versions[latestIndex].content);
        setActiveVersionIndex(latestIndex);
      };
      fetchResume();
    } else {
      // If there is no ID, we are creating a fresh resume
      setData(initialEmptyState); // Set your default empty object if new
    }
  }, [id]);

  // When switching versions
  const handleVersionSelect = (index) => {
    // 1. Alert user if they have unsaved changes in current version (Optional)
    
    // 2. Switch the view
    setActiveVersionIndex(index);
    setData(fullResume.versions[index].content);
  };

  // General Toast Notification
  const [toast, setToast] = useState({ show: false, message: "" });

  // This is the handler we pass to the Form
  const triggerToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 5000);
  };
  
  // 📥 PDF Download Logic
  const downloadPDF = () => {
  // 1. Grab the element using your actual ID (matching your template wrapper)
  const element = document.querySelector(".resume-paper");
  
  if (!element) {
    console.error("Resume element container not found!");
    return;
  }

  const options = {
    margin: 0,
    filename: `${data.name || 'Resume'}_CV.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true,
      logging: false,
      // Change from 0 to window.screen.width to prevent horizontal text clipping
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    
    onclone: (clonedDoc) => {
        const clonedPaper = clonedDoc.querySelector('.resume-paper');
        if (clonedPaper) {
          clonedPaper.style.boxShadow = 'none'; // No shadow in PDF
          clonedPaper.style.height = 'auto';
          clonedPaper.style.maxHeight = 'none';
          clonedPaper.style.overflow = 'visible';
 
          // ✅ Fix blank extra page: force height to match actual content,
          // not the 1123px min-height. jsPDF only adds a new page when the
          // rendered canvas exceeds one A4 page, so trimming min-height
          // prevents that extra empty page from appearing.
          clonedPaper.style.minHeight = '0';
        }
      }
  };

  triggerToast("Generating your PDF...");
  html2pdf().set(options).from(element).save();
  setTimeout(() => triggerToast("PDF Downloaded"), 1100);
};







  // Save Resume or Create Version (Copy)
  const saveResume = async (isNewVersion = false) => {
    const token = localStorage.getItem("token");
    
    try {
      const res = await axios.post("http://localhost:5000/api/resumes/save", {
        resumeId: resumeId, // Passes null for new, or the ID for updates
        title, 
        content: data,
        templateId: "Template1",
        versionIndex: activeVersionIndex, // Tell backend WHICH version to overwrite
        createNewVersion: isNewVersion // A flag to tell backend: "Push new" vs "Overwrite last"
      }, {
        headers: { "auth-token": token }
      });

      // If this was a brand new resume, the backend just created an ID. 
      // We must save it so the NEXT click knows it's an update.
      if (!resumeId) {
        setResumeId(res.data._id);
        window.history.replaceState(null, "", `/builder/${res.data._id}`);
      }

      triggerToast(isNewVersion ? "New Version Created!" : "Progress Saved!");
    } catch (err) {
      console.error(err);
      triggerToast("Something went Wrong");
    }
  };

  // Ensure we don't render children until data is ready
  if (!data) return <div className="loading-spinner" style={{fontSize:"2rem",padding:"4rem"}}>Initializing Builder...</div>;// Don't render until data is ready

  return (
    <div className="builder-wrapper">
      
      {/* 🔔 Toast Notification */}
      {toast.show && <div className="toast-popup">{toast.message}</div>}

      <Navbar token={token} onLogout={handleLogout} >
        <header className="builder-header">
          <div className="header-content">
            {/* <h1 className="form-main-title">Resume Builder</h1> */}

            <div className="header-actions">
              {fullResume && (
                <VersionDropdown 
                  versions={fullResume.versions} 
                  activeIndex={activeVersionIndex}
                  onVersionSelect={handleVersionSelect}
                />
              )}
              {/* SEAMLESS TITLE INPUT */}
              <div style={styles.titleContainer}>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  style={styles.titleInput}
                  placeholder="Enter Resume Title..."
                />
              </div>
              <button className="btn-save" onClick={() => saveResume(false)}>Save</button>
              <button  className="btn-save" onClick={() => saveResume(true)} style={{backgroundColor: 'green'}}>
                Create Copy {/*(New Version)*/}
              </button>
              {/* Future Save/Download buttons will go here */}
              <button className="btn-download" onClick={downloadPDF}>
                <span>⬇</span> Download PDF
              </button>
            </div>
          </div>
        </header>
      </Navbar>
      <main className="flex gap-6 p-6" style={{ height: "100vh"}}>
        <div className="form-container">
          <StrengthMeter data={data} />
          {/* We pass the handler here */}
          <Form data={data} setData={setData} triggerToast={triggerToast} />
        </div>
        
        <div className="preview-container">
          <div id="resume" style={{ width: "100%", maxWidth: "800px" }}>
            <ResumePreview data={data} />
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  titleContainer: {
    padding: '10px',
    border: '2px solid #e2e8f0', // The border you requested
    borderRadius: '8px',
    background: '#f8fafc'
  },
  titleInput: {
    width: '100%',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    border: 'none', // Invisible border
    outline: 'none', // No glow on click
    background: 'transparent',
    color: '#1e293b'
  }
};

export default Builder;