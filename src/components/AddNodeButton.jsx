import React, { useState } from 'react';

const AddNodeButton = ({ onAdd, parentType }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (parentType === 'end') return null;

  return (
    <div className="add-wrapper" onMouseLeave={() => setIsOpen(false)}>
      <div className="vertical-line"></div>
      
      <button 
        className="add-btn-circle" 
        onClick={() => setIsOpen(!isOpen)}
      >
        +
      </button>

      {isOpen && (
        <div className="add-menu">
          <button onClick={() => onAdd('action')}>Add Action</button>
          <button onClick={() => onAdd('branch')}>Add Condition</button>
          <button onClick={() => onAdd('end')}>Add End</button>
        </div>
      )}
      
      <div className="vertical-line"></div>
    </div>
  );
};

export default AddNodeButton;