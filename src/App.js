import React, {useState} from 'react';
import './App.css';

import CreateGame from "./components/gameMenu/CreateGame";
import GameComponent from "./components/game/GameComponent";
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
                    <AvailableGames games={props.games}
                                    joinGame={props.joinGame}
                                    setInGame={setInGame}
                                    refreshGamesList={props.refreshGamesList}
                    />
                </div>
                }
                {inGame && <GameComponent opponent={props.opponent}
                                          move={props.move}/>}
            </header>

        </div>
    );
};

export default App;
