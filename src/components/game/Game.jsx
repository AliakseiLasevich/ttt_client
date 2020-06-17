import React from "react";
import SockJsClient from "react-stomp";

export class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    onConnect = () => {
        console.log("game on connect")
        this.getCurrentGameInfo();
    };

    onDisconnect = () => {

    };
    onMessageReceive = (message, topic) => {
        console.log(`inside game component. message: ${message}`);
    };

    getCurrentGameInfo = () => {
        this.clientRef.sendMessage(`/app/player1Game`);
    };

    render() {

        return (
            <div>
                GAME HERE
                <SockJsClient url={"http://localhost:8080/handler"}
                              topics={['/queue/player1Game']}
                              onMessage={this.onMessageReceive}
                              onConnect={this.onConnect}
                              onDisconnect={this.onDisconnect}
                              ref={(client) => {
                                  this.clientRef = client
                              }}/>
            </div>
        );
    }
}