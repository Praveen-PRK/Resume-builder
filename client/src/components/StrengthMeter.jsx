import React from 'react';
import { calculateResumeStrength } from '../utils/strengthEvaluator';
import '../styles/StrengthMeter.css';

const StrengthMeter = ({ data }) => {
  // Destructure our data payload from the updated evaluator
  const { percentage, tips } = calculateResumeStrength(data);

  let statusClass = "fill-weak";
  let statusText = "Weak Draft";

  if (percentage >= 75) {
    statusClass = "fill-strong";
    statusText = "Excellent Layout";
  } else if (percentage >= 45) {
    statusClass = "fill-good";
    statusText = "Good Progress";
  }

  return (
    <div className="strength-meter-box">
      <div className="strength-label-container">
        <span className="strength-title">Profile Integrity: <strong>{statusText}</strong></span>
        <span className="strength-percentage" style={{
          color: percentage >= 75 ? '#10b981' : percentage >= 45 ? '#f59e0b' : '#ef4444'
        }}>{percentage}%</span>
      </div>
      
      <div className="progress-track">
        <div 
          className={`progress-fill ${statusClass}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Dynamic Action Items Checklist */}
      {tips.length > 0 && (
        <div className="strength-tips" style={{ marginTop: '14px' }}>
          <p style={{ margin: '0 0 6px 0', fontWeight: '600'}}>
            Action items to increase optimization:
          </p>
          <ul style={{ margin: 0, paddingLeft: '16px' }}>
            {tips.slice(0, 2).map((tip, index) => (
              <li key={index} style={{ marginBottom: '4px', lineHeight: '1.3' }}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StrengthMeter;