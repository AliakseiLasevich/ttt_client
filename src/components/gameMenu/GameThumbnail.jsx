import React from "react";
import thumbnail from "./../../assets/img/thumbnail.png";
import style from "./GameThumbnail.module.css";

const GameThumbnail = (props) => {

        return (
            <div className={style.GameThumbnail} onClick={() => {
                props.joinGame()
            }}>
                <img src={thumbnail}/>
                <div> {props.tag}</div>
                <div className={style.joinGame}>Join game</div>


            </div>
        );
    };

export default GameThumbnail;
