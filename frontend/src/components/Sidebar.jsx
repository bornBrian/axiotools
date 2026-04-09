import React from 'react';
import './Sidebar.css';

const Sidebar = ({ currentPage, onPageChange, isOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'image-tools', label: 'Image Tools', icon: '🖼️' },
    { id: 'pdf-tools', label: 'PDF Tools', icon: '📄' },
    { id: 'file-tools', label: 'File Tools', icon: '📁' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {/* Logo Area */}
      <div className="sidebar-header">
        <img className="sidebar-logo" src="/logo.svg" alt="AxioTools logo" />
        <span className="logo-text">AxioTools</span>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`menu-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => onPageChange(item.id)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Info */}
      <div className="sidebar-footer">
        <p className="version-text">v1.0.0</p>
        <p className="footer-note">Fast &amp; Clean</p>
      </div>
    </aside>
  );
};

export default Sidebar;
