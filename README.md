# Workflow Builder UI 🚀

A powerful, interactive, and visual workflow builder developed as a Frontend Intern Take-Home Assignment. This application allows users to design complex logic flows with Actions and Conditions using a clean, tree-based UI.

**🔴 LIVE DEMO LINK :** https://emitrr-assignment-ramaditya.vercel.app/

---

## 📋 Project Overview

The goal of this project was to build a simplified version of tools like React Flow or Zapier, but **without using any external diagramming or UI libraries**.

The application manages a complex tree data structure, handles recursive rendering for nested branches, and implements state management for features like Undo/Redo and node insertion.

### Key Features
* **Visual Flowcharting:** Renders Start (Oval), Action (Rectangle), Condition (Diamond), and End nodes.
* **Recursive Rendering:** Infinite nesting of nodes and branches.
* **Smart Interactions:**
    * **Add Nodes:** Insert nodes anywhere in the flow (even between existing nodes).
    * **Delete Nodes:** Automatically reconnects children to the parent to maintain flow continuity.
    * **Edit Labels:** Click any text to rename the node.
* **Branching Logic:** "Condition" nodes split the flow into distinct "True" and "False" paths.
* **History Management:** Full **Undo/Redo** support for structural changes.
* **Save Capability:** Exports the current workflow structure as a JSON object to the console.

---

## 🛠️ Tech Stack

* **Framework:** React (Vite)
* **Language:** JavaScript (ES6+)
* **Styling:** Pure CSS3 (Flexbox, CSS Variables, Transforms)
* **Icons:** Native text/CSS shapes (No icon libraries used)
* **State Management:** Custom React Hook (`useWorkflow`)

---

## ⚙️ Installation & Running Locally

1. **Clone the repository**
```bash
git clone https://github.com/ramaditya57/Emitrr-Assignment
cd workflow-builder
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. Open `http://localhost:5173` in your browser.

---

## 📂 Project Structure

```
src/
├── components/
│   ├── NodeCard.jsx
│   ├── AddNodeButton.jsx
│   └── WorkflowNode.jsx
├── hooks/
│   └── useWorkflow.js
├── App.css
└── App.jsx
```

---

## 🧠 Design Decisions & Challenges

### Data Structure
Used a flat object structure with ID-based lookup for performance and scalability.

### Recursive Rendering
`WorkflowNode` recursively renders children to allow infinite nesting.

### Branch Deletion
Deleting nodes automatically reconnects children to maintain workflow continuity.

### Pure CSS Shapes
Diamonds are created using rotation with counter-rotation for readable text.

---

## ✅ Assignment Requirements Checklist

| Requirement | Status |
|------------|--------|
| No UI Libraries | ✅ |
| Data Modeling | ✅ |
| Node Types | ✅ |
| Visual Lines | ✅ |
| Add/Delete/Edit | ✅ |
| Undo/Redo | ✅ |
| Save to JSON | ✅ |
