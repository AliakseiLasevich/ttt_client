import React, {useState} from "react";
import Cell from "./Cell";
import style from "./GameGrid.module.css";
import GameOverWindow from "../menu/GameOverWindow";

const GameGrid = (props) => {

        let gameField = [];
        for (let i = 0; i < 9; i++) {
            gameField.push(
                <Cell id={i}
                      key={i}
                      move={props.move}
                      toggleUserTurn={props.toggleUserTurn}
                      moveEquivalent={props.moveEquivalent}
                      opponentMoves={props.opponentMoves}
                      userMoves={props.userMoves}/>
            )
        }

        return (
            <div>
                {(props.winnerId || props.isTie) && <GameOverWindow userId={props.userId}
                                                                    winnerId={props.winnerId}
                                                                    setInGame={props.setInGame}
                                                                    isTie={props.isTie}
                                                                    resetState={props.resetState}/>}
                {props.opponent && <div>
                    <div className={props.userTurn ? style.gameField : style.disabled}>  {gameField}  </div>
                    {props.userTurn && "Your turn"}
                    {!props.userTurn && "Enemy turn"}
                </div>}
                {!props.opponent && "Waiting for player 2"}


            </div>
        );
    }
;

export default GameGrid;