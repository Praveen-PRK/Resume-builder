import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = ({ onSignupSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", { email, password });
      
      // Call the parent's success function
      onSignupSuccess(res.data.token, res.data.user);

      navigate("/dashboard"); // Redirect to the builder page
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
          <nav style={styles.navbar}>
          {/* Left Slot: Branding */}
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <h2 style={styles.logo}>ResuMake</h2>
            </Link>
          </nav>
        <div className="auth-container">
          <form className="form-card" style={{maxWidth: '400px', margin: '100px auto'}} onSubmit={handleSignup}>
            <h2 style={{fontSize: '2.4rem', marginBottom: '2rem'}}>Sign Up</h2>
            <div className="form-elem">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="form-elem">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn-download" style={{justifyContent: "center",width: '100%', marginTop: '1rem'}}>
              Sign Up
            </button>
            <p style={{marginTop: '1.5rem', fontSize: '1.4rem'}}>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </form>
        </div>
    </>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem',
    height: '70px',
    background: '#1e293b', // Professional Dark Slate
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  logo: {
    color : "white"
  }
};

export default Signup;