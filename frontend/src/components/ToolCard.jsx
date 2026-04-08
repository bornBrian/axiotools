import React from 'react';
import './ToolCard.css';

const ToolCard = ({ icon, title, description, onClick, badge }) => {
  return (
    <button className="tool-card" onClick={onClick}>
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
      {badge && <span className="card-badge">{badge}</span>}
      <span className="card-arrow">→</span>
    </button>
  );
};

export default ToolCard;
