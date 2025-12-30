import { useState } from 'react';

const initialData = {
  "start-node": {
    id: "start-node",
    type: "start",
    label: "Start Workflow",
    childId: null,
  },
};

export const useWorkflow = () => {
  const [history, setHistory] = useState([initialData]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const nodes = history[historyIndex];

  const generateId = () => `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const updateNodes = (newNodes) => {
    const newHistory = history.slice(0, historyIndex + 1);
    
    newHistory.push(newNodes);
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const addNode = (parentId, newType, branchIndex = null) => {
    const newId = generateId();
    const newNode = {
      id: newId,
      type: newType,
      label: newType === 'branch' ? 'Condition Check' : `New ${newType}`,
      children: newType === 'branch' ? [null, null] : null,
      childId: null,
    };

    const nextNodes = { ...nodes };
    nextNodes[newId] = newNode;

    const parent = nextNodes[parentId];

    if (parent.type === 'branch') {
      const newChildren = [...parent.children];
      if (newChildren[branchIndex]) {
        newNode.childId = newChildren[branchIndex];
      }
      newChildren[branchIndex] = newId;
      nextNodes[parentId] = { ...parent, children: newChildren };
    } else {
      if (parent.childId) {
        newNode.childId = parent.childId;
      }
      nextNodes[parentId] = { ...parent, childId: newId };
    }

    updateNodes(nextNodes);
  };

  const deleteNode = (nodeId) => {
    const nextNodes = { ...nodes };
    const nodeToDelete = nextNodes[nodeId];
    
    const parentKey = Object.keys(nextNodes).find(key => {
      const n = nextNodes[key];
      if (n.type === 'branch') return n.children.includes(nodeId);
      return n.childId === nodeId;
    });

    if (!parentKey) return;

    const parent = nextNodes[parentKey];
    let childToConnect = null;

    if (nodeToDelete.type === 'branch') {
      childToConnect = nodeToDelete.children[0] || nodeToDelete.children[1] || null;
    } else {
      childToConnect = nodeToDelete.childId;
    }

    if (parent.type === 'branch') {
      const newChildren = parent.children.map(child => child === nodeId ? childToConnect : child);
      nextNodes[parentKey] = { ...parent, children: newChildren };
    } else {
      nextNodes[parentKey] = { ...parent, childId: childToConnect };
    }

    delete nextNodes[nodeId];
    updateNodes(nextNodes);
  };

  const updateLabel = (id, newLabel) => {
    const nextNodes = {
      ...nodes,
      [id]: { ...nodes[id], label: newLabel }
    };
    updateNodes(nextNodes);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  return { 
    nodes, 
    addNode, 
    deleteNode, 
    updateLabel,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1
  };
};