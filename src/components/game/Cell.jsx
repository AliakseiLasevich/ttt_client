import React, {useState} from "react";
import style from "./Cell.module.css";

const Cell = (props) => {

    const [value, setValue] = useState();

    const touched = () => {
        return props.opponentMoves.includes(props.id) || props.userMoves.includes(props.id);
    };

    return (
        <div className={touched() ? style.touched : style.cell}
             onClick={() => {
                 setValue(props.moveEquivalent);
                 props.move(props.id);
                 props.toggleUserTurn();
             }}>

            <div>
                {props.opponentMoves.includes(props.id) && <span className={style.move}>O</span>}
                {props.userMoves.includes(props.id) && <span className={style.move}>X</span>}

            </div>
        </div>
    )
};

export default Cell;