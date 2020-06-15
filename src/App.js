import React from 'react';
import logo from './logo.svg';
import './App.css';
import GameWindow from "./components/gameWindow/gameWindow";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h2>Initial message</h2>
          <GameWindow/>
      </header>
    </div>
  );
}

export default App;
