import React from "react";
import SockJsClient from "react-stomp";

export class CreateGameForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onConnect = () => {
    };

    onDisconnect = () => {
    };

    sendMessage = (msg) => {
        this.clientRef.sendMessage('/app/createGame', JSON.stringify(msg));
    };

    onMessageReceive = (msg, topic) => {
    };

    handleSubmit(event) {
        this.sendMessage(this.state.value);
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="tag" placeholder="Enter tag" value={this.state.value}
                           onChange={this.handleChange}/>
                    <input type="submit" value="New Game"/>
                </form>
                <SockJsClient url={"http://localhost:8080/handler"}
                              topics={['/topic/availableGames']}
                              onMessage={this.onMessageReceive}
                              onConnect={this.onConnect}
                              onDisconnect={this.onDisconnect}
                              ref={(client) => {
                                  this.clientRef = client
                              }}/>
            </div>
        )
    }
};

export default CreateGameForm;