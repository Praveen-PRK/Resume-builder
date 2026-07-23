import { useState } from "react";

const VersionDropdown = ({ versions, activeIndex, onVersionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button 
        className="btn-save" 
        style={styles.dropdownToggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>📂</span> {versions[activeIndex]?.label || `Version ${activeIndex + 1}`} ▾
      </button>

      {isOpen && (
        <>
          {/* Transparent backdrop to close dropdown when clicking outside */}
          <div style={styles.backdrop} onClick={() => setIsOpen(false)} />
          
          <div style={styles.menu}>
            <div style={styles.header}>Evolution Tracker</div>
            {versions.map((v, index) => (
              <div 
                key={index} 
                onClick={() => {
                  onVersionSelect(index);
                  setIsOpen(false);
                }}
                style={{
                  ...styles.item,
                  backgroundColor: activeIndex === index ? '#eff6ff' : 'transparent',
                  color: activeIndex === index ? '#2563eb' : '#1e293b'
                }}
              >
                <div style={{ fontWeight: '600' }}>{v.label || `Version ${index + 1}`}</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                  {new Date(v.updatedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  dropdownToggle: {
    backgroundColor: '#334155',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  backdrop: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 999
  },
  menu: {
    position: 'absolute',
    top: '110%',
    right: 0,
    width: '220px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
    zIndex: 1000,
    padding: '8px 0',
    overflow: 'hidden'
  },
  header: {
    padding: '8px 16px',
    fontSize: '1.45rem',
    fontWeight: 'bold',
    color: '#94a3b8',
    textTransform: 'uppercase',
    borderBottom: '1px solid #f1f5f9'
  },
  item: {
    padding: '10px 16px',
    cursor: 'pointer',
    transition: 'background 0.2s',
    fontSize: '1.3rem'
  }
};

export default VersionDropdown;