// src/App.tsx
import React from 'react';
import './App.css';
import SocketIOClient from './SocketIOClient';

const App: React.FC = () => {
  return (
    <div className="App">
      <SocketIOClient />
    </div>
  );
};

export default App;
