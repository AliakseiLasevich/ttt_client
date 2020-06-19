import React, {useState} from "react";
import style from "./CreateGame.module.css";
import CreateGameForm from "./CreateGameForm";

const CreateGame = (props) => {

    const [editMode, setEditMode] = useState(false);

    return (
        <div>

            {editMode &&
            <div className={style.form}>
                <CreateGameForm setInGame={props.setInGame}
                                 createGame={props.createGame}
                                 setEditMode={setEditMode}/>

            </div>
            }
            <div className={style.createGame} onClick={() => {
                setEditMode(!editMode);
            }}>
                {!editMode && "Create game"}
                {editMode && "Cancel"}
            </div>
        </div>
    )
};

export default CreateGame;