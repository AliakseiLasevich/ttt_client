import React, {useState} from "react";
import style from "./Cell.module.css";

const Cell = (props) => {

    const [touched, setTouched] = useState(false);

    return (
        <div className={!touched ? style.cell : style.disabled} onClick={() => {
            setTouched(true);
            props.move(props.id);
        }}>
            {props.id}
            {props.value}
        </div>
    )
};

export default Cell;