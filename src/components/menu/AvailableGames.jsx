import React from "react";
import GameThumbnail from "./GameThumbnail";
import style from "./AvailableGames.module.css";

const AvailableGames = (props) => {

    let games = props.games.map(game => <GameThumbnail key={game.id}
                                                       name={game.name}
                                                       id={game.id}
                                                       joinGame={props.joinGame}
                                                       setInGame={props.setInGame}
                                                       refreshGamesList={props.refreshGamesList}/>);


    return (
        <div>
            <div className={style.AvailableGames}>
                {games}
            </div>
        </div>
    );
}
export default AvailableGames;