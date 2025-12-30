import React from 'react';
import NodeCard from './NodeCard';
import AddNodeButton from './AddNodeButton';

const WorkflowNode = ({ nodeId, nodes, addNode, deleteNode, updateLabel }) => {
  const node = nodes[nodeId];
  if (!node) return null;

  if (node.type !== 'branch') {
    return (
      <div className="node-wrapper">
        <NodeCard node={node} onDelete={deleteNode} onUpdate={updateLabel} />
        
        {node.type !== 'end' && (
          <AddNodeButton 
            parentType={node.type} 
            onAdd={(type) => addNode(node.id, type)} 
          />
        )}

        {node.childId && (
          <WorkflowNode 
            nodeId={node.childId} 
            nodes={nodes} 
            addNode={addNode} 
            deleteNode={deleteNode} 
            updateLabel={updateLabel} 
          />
        )}
      </div>
    );
  }

  return (
    <div className="node-wrapper">
      <NodeCard node={node} onDelete={deleteNode} onUpdate={updateLabel} />
      
      <div className="branch-container">
        <div className="branch-column">
           <div className="branch-label yes">True</div>
           {node.children[0] ? (
             <WorkflowNode 
               nodeId={node.children[0]} 
               nodes={nodes} 
               addNode={addNode} 
               deleteNode={deleteNode} 
               updateLabel={updateLabel} 
             />
           ) : (
             <AddNodeButton 
                parentType="branch" 
                onAdd={(type) => addNode(node.id, type, 0)}
             />
           )}
        </div>

        <div className="branch-column">
           <div className="branch-label no">False</div>
           {node.children[1] ? (
             <WorkflowNode 
               nodeId={node.children[1]} 
               nodes={nodes} 
               addNode={addNode} 
               deleteNode={deleteNode} 
               updateLabel={updateLabel} 
             />
           ) : (
             <AddNodeButton 
                parentType="branch" 
                onAdd={(type) => addNode(node.id, type, 1)} 
             />
           )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowNode;