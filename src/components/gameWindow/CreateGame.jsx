import React, {useState} from "react";
import style from "./CreateGame.module.css";
import CreateGameForm from "./CreateGameForm";

const CreateGame = () => {

    const [editMode, setEditMode] = useState(false);

    return (
        <div>
            <div className={style.createGame} onClick={() => {
                setEditMode(!editMode);
            }}>
                {!editMode && "Create game" }
                {editMode && "Cancel" }
            </div>
            {editMode && <CreateGameForm/>}
        </div>
    )
};

export default CreateGame;