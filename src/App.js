import React from 'react';
import './App.css';
import {AvailableGames} from "./components/gameWindow/AvailableGames";
import CreateGame from "./components/gameWindow/CreateGame";


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <CreateGame/>
                <AvailableGames/>
            </header>
        </div>
    );
}

export default App;
