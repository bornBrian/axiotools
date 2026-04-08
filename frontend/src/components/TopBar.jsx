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
      </div>

      <div className="topbar-right">
        <button className="upload-btn">
          <span>📤</span> Upload File
        </button>
      </div>
    </header>
  );
};

export default TopBar;
