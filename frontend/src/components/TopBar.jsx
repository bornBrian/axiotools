import React from 'react';
import './TopBar.css';

const TopBar = ({ onToggleSidebar }) => {
  return (
    <header className="top-bar">
      <div className="topbar-left">
        <button className="hamburger-btn" onClick={onToggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="topbar-brand">
          <img src="/logo.svg" alt="AxioTools" className="topbar-logo" />
          <span>AxioTools</span>
        </div>
      </div>

      <div className="topbar-right">
        <button className="upload-btn">
          <span className="upload-icon">📤</span>
          <span className="upload-label">Upload File</span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
