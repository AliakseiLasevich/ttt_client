import React from "react";
import GameThumbnail from "./GameThumbnail";
import style from "./AvailableGames.module.css";

const AvailableGames = (props) => {

    let games = props.games.map(game => <GameThumbnail tag={game.tag}
                                                       id={game.id}
                                                       playerOne={game.playerOne}/>);


    return (
        <div>
            <div className={style.AvailableGames}>
                {games}
            </div>
            AvailableGames here

        </div>
    );
}
export default AvailableGames;