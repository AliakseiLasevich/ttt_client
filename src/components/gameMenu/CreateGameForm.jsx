import React from "react";
import {useForm} from "react-hook-form";
import style from "./CreateGameForm.module.css";

const CreateGameForm = (props) => {

        const {register, handleSubmit, errors} = useForm();

        const onSubmit = (data) => {
            props.createGame(data.tag);
            props.setEditMode(false);
            props.setInGame(true)
        };

        return (
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Enter tag here" name="tag"
                           ref={register({required: "Tag is required"})}/>
                    <div>  {errors.tag && <span className={style.errorMessage}>{errors.tag.message}</span>}</div>
                    <input type="submit" value="New Game"/>
                </form>
            </div>
        )
    };

export default CreateGameForm;