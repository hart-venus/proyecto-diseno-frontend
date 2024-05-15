import React from 'react';

const ErrorPopup = ({ errorMessage, onClose }) => {
  return (
    <div className="error-popup">
      <div className="error-popup-content">
        <span className="close-btn" onClick={onClose}>×</span>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorPopup;