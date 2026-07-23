import ProfileMenu from "./ProfileMenu";
import { Link } from "react-router-dom";

const Navbar = ({ token, onLogout, children }) => {
  return (
    <nav style={styles.navbar}>
      {/* Left Slot: Branding */}
      <div style={styles.leftSection}>
        <Link className="logo" to="/dashboard" style={{ textDecoration: 'none'}}>
          <h2 style={styles.logo}>ResuMake</h2>
        </Link>
      </div>

      {/* Middle Slot: Dynamic Content (The "Children") */}
      <div style={styles.middleSection}>
        {children}
      </div>

      {/* Right Slot: Profile */}
      <div style={styles.rightSection}>
        {token && <ProfileMenu onLogout={onLogout} />}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem',
    height: '70px',
    background: 'white', // Professional Dark Slate
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  middleSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center', // Centers your Builder tools
    gap: '15px'
  }
};

export default Navbar;