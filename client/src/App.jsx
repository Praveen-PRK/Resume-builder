import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Builder from "./pages/Builder"
import Navbar from "./components/Navbar";
import TemplateSelector from "./pages/TemplateSelector";
import { useState } from "react";

function App() {
  // 1. Initialize state with whatever is in localStorage
  const [token, setToken] = useState(localStorage.getItem("token"));

  // 2. This function will be passed to Login/Signup to update the state
  const handleAuthSuccess = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData)); // Store {id, email}
    setToken(newToken); // This triggers the re-render!
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <>
      <Router>
        {/* <Navbar token={token} onLogout={handleLogout} /> */}
        <Routes>
          <Route path="/signup" element={<Signup onSignupSuccess={handleAuthSuccess}/>} />
          <Route path="/login" element={<Login onLoginSuccess={handleAuthSuccess}/>} />

          {/* Protected Routes */}
          <Route
           path="/dashboard"
           element={token ? <Dashboard  token={token} handleLogout={handleLogout}/> : <Navigate to="/login"/>} 
          />
          <Route 
           path="/select-template" 
           element={token ? <TemplateSelector  token={token} handleLogout={handleLogout}/> : <Navigate to="/login" />} 
          />

          {/* Pass the template ID to the builder */}
          {/* :id? means the ID is optional */}
          <Route 
            path="/builder/:id?" 
            element={token ? <Builder token={token} handleLogout={handleLogout}/> : <Navigate to="/login" />} 
          />

          <Route 
            path="/" 
            element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
