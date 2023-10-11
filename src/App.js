import React from 'react';
import './App.css';
import KanbanBoard from './components/KanbanBoard'; // Import the KanbanBoard component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Kanban Board App</h1>
      </header>
      <main>
        <KanbanBoard /> {/* Render the KanbanBoard component */}
      </main>
    </div>
  );
}

export default App;