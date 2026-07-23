import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Get user data safely
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userEmail = user.email || "User";
  const userInitial = userEmail[0].toUpperCase();

return (
    <div className="container">
      <div onClick={() => setIsOpen(!isOpen)} className="avatar">
        {userInitial}
      </div>

      {isOpen && (
        <>
          <div className="backdrop" onClick={() => setIsOpen(false)} />
          <div className="dropdown">
            <div className="header">
              <div className="large-avatar">{userInitial}</div>
              <div>
                <p className="email-text">{userEmail}</p>
                <span className="badge">Free Tier</span>
              </div>
            </div>
            
            <div className="divider" />
            
            <button className="hoverFade menu-item" onClick={() => { navigate("/dashboard"); setIsOpen(false); }}>
              Dashboard
            </button>
            
            <button className="hoverRed menu-item" onClick={onLogout}>
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};


export default ProfileMenu;