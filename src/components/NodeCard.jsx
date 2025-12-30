import React, { useState } from 'react';
import '../App.css';

const NodeCard = ({ node, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(node.label);

  const handleBlur = () => {
    setIsEditing(false);
    onUpdate(node.id, label);
  };

  return (
    <div className={`node-card node-${node.type}`}>
      
      <div className="node-content-wrapper">
        {isEditing ? (
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            className="node-input"
          />
        ) : (
          <div onClick={() => setIsEditing(true)} className="node-text">
            <span className="node-type-label">{node.type.toUpperCase()}</span>
            <div className="node-label-text">{node.label}</div>
          </div>
        )}
      </div>

      {node.type !== 'start' && (
        <button className="delete-btn" onClick={() => onDelete(node.id)}>×</button>
      )}
    </div>
  );
};

export default NodeCard;