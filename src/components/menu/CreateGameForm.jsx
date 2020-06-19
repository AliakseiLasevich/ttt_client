import React from "react";
import {useForm} from "react-hook-form";
import style from "./CreateGameForm.module.css";
import TagManager from "./TagManager";

const CreateGameForm = (props) => {

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        props.createGame(data.name);
        props.setEditMode(false);
        props.setInGame(true)
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Enter name here" name="name"
                       ref={register({required: "Name is required"})}/>
                <div>  {errors.name && <span className={style.errorMessage}>{errors.name.message}</span>}</div>
                <TagManager/>
                <div className={style.tagNote}> Press enter to apply tag.</div>
                <input type="submit" value="New Game!"/>
            </form>
        </div>
    )
};

export default CreateGameForm;