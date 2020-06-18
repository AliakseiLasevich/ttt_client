import React from "react";
import Cell from "./Cell";
import style from "./GameGrid.module.css";

const GameGrid = (props) => {

        let gameField = [];

        for (let i = 0; i < 9; i++) {
            gameField.push(
                <Cell id={i}
                      key={i}
                      value={null}
                      move={props.move}/>
            )
        }

        return (
            <div>
                {props.opponent && <div className={style.gameField}>
                    {gameField}
                </div>
                }
                {!props.opponent && "Waiting for player 2"}
            </div>
        );
    }
;

export default GameGrid;