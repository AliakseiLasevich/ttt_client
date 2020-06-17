import React, {useState} from 'react';
import './App.css';

import CreateGame from "./components/gameMenu/CreateGame";
import {Game} from "./components/game/Game";
import AvailableGames from "./components/gameMenu/AvailableGames";


const App = (props) => {

    const [inGame, setInGame] = useState(false);

    return (
        <div className="App">
            <header className="App-header">
                {!inGame &&
                <div>
                    <CreateGame createGame={props.createGame}
                                setInGame={setInGame}/>
                    <AvailableGames games={props.games}/>
                </div>
                }
                {inGame && <Game/>}
            </header>

        </div>
    );
};

export default App;
