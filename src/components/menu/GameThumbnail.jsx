import React from "react";
import thumbnail from "./../../assets/img/thumbnail.png";
import style from "./GameThumbnail.module.css";

const GameThumbnail = (props) => {

    return (
        <div className={style.GameThumbnail} onClick={() => {
            props.joinGame(props.id);
            props.setInGame(true);
            props.refreshGamesList();
        }}>
            <img src={thumbnail} alt="game icon"/>
            <div>{props.name}</div>
            <div className={style.joinGame}>Click to join</div>
        </div>
    );
};

export default GameThumbnail;
