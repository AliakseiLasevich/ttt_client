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
            <div> tag: {props.tag}</div>
            <div className={style.joinGame}>Join game</div>


        </div>
    );
};

export default GameThumbnail;
