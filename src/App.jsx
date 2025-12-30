import React from 'react';
import './App.css';
import { useWorkflow } from './hooks/useWorkflow';
import WorkflowNode from './components/WorkflowNode';

function App() {
  const { 
    nodes, addNode, deleteNode, updateLabel, 
    undo, redo, canUndo, canRedo 
  } = useWorkflow();

  const handleSave = () => {
    console.log(JSON.stringify(nodes, null, 2));
    alert("Workflow JSON logged to Console!");
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Workflow Builder</h1>
        
        <div className="controls">
          <button onClick={undo} disabled={!canUndo} className="control-btn">
            ↩ Undo
          </button>
          <button onClick={redo} disabled={!canRedo} className="control-btn">
            Redo ↪
          </button>
          
          <div className="divider"></div>

          <button className="save-btn" onClick={handleSave}>
            💾 Save
          </button>
        </div>
      </div>

      <WorkflowNode 
        nodeId="start-node"
        nodes={nodes}
        addNode={addNode}
        deleteNode={deleteNode}
        updateLabel={updateLabel}
      />
    </div>
  );
}

export default App;