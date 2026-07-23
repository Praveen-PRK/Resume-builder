import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = ({token, handleLogout}) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      try{
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/resumes/my-resumes", {
          headers: { "auth-token": token }
        });
        setResumes(res.data);
      }catch (err) {
        console.error("Error fetching resumes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  return (
    <div className="dashboard-page">
      <Navbar token={token} onLogout={handleLogout} />
      
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Your Resumes</h1>
          <button className="btn-create-new" onClick={() => navigate("/builder")}>
            + Create New Resume
          </button>
        </header>

        {loading ? (
          <div style={{ textAlign: "center", color: "#64748b", fontSize: "1.7rem" }}>Loading your workspaces...</div>
        ) : (
          <div className="resume-grid">
            {resumes.length === 0 ? (
              <div className="no-resumes">
                <h3>No Resumes Found</h3>
                <p>Click "Create New Resume" above to start your first draft!</p>
              </div>
            ) : (
              resumes.map((resume) => {
                const totalVersions = resume.versions?.length || 1;
                const lastEdited = resume.versions?.[totalVersions - 1]?.updatedAt;

                return (
                  <div key={resume._id} className="resume-card">
                    <div>
                      <h3>{resume.title || "Untitled Resume"}</h3>
                      <p className="resume-meta">
                        📁 Versions: <span>{totalVersions}</span>
                      </p>
                      {lastEdited && (
                        <p className="resume-meta">
                          🕒 Updated: <span>{new Date(lastEdited).toLocaleDateString()}</span>
                        </p>
                      )}
                    </div>
                    
                    <div className="card-actions">
                      <button 
                        className="btn-edit" 
                        onClick={() => navigate(`/builder/${resume._id}`)}
                      >
                        Edit Workspace
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;