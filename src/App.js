import React, {useState} from 'react';
import './App.css';

import CreateGame from "./components/menu/CreateGame";
import GameGrid from "./components/game/GameGrid";
import AvailableGames from "./components/menu/AvailableGames";
import TagManager from "./components/menu/TagManager";


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
                {inGame && <GameGrid opponent={props.opponent}
                                     move={props.move}
                                     userTurn={props.userTurn}
                                     toggleUserTurn={props.toggleUserTurn}
                                     moveEquivalent={props.moveEquivalent}
                                     opponentMoves={props.opponentMoves}
                                     userMoves={props.userMoves}
                                     winnerId={props.winnerId}
                                     userId={props.userId}
                                     setInGame={setInGame}
                                     isTie={props.isTie}
                                     resetState={props.resetState}/>}
            </header>

        </div>
    );
};

export default App;
