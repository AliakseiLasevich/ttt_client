import React, {useState} from "react";
import style from "./CreateGame.module.css";
import CreateGameForm from "./CreateGameForm";
import TagManager from "./TagManager";

const CreateGame = (props) => {

    const [editMode, setEditMode] = useState(false);

    return (
        <div>
            <div className={style.createGame} onClick={() => {
                setEditMode(!editMode);
            }}>
                {!editMode && "Create game"}
                {editMode && "Cancel"}
            </div>
            {editMode &&
            <div><CreateGameForm setInGame={props.setInGame}
                                 createGame={props.createGame}
                                 setEditMode={setEditMode}/>
                <TagManager/>
            </div>

            }
        </div>
    )
};

export default CreateGame;