import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

const GameOverWindow = (props) => {

    let message = props.userId === props.winnerId ? "You win!" : "You lose!";

    if (props.isTie) {
        message = "Tie!"
    }

    return (
        <div>
            <SweetAlert title={message} onConfirm={() => {
                props.resetState();
                props.setInGame(false);
            }} onCancel={() => {
            }} style={{width: '300px'}}/>
        </div>);
};

export default GameOverWindow;
