import React from "react";
import SockJsClient from "react-stomp";
import App from "../../App";

export class WebSocketHOC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            connected: true
        }
    }

    onConnect = () => {
        this.clientRef.sendMessage('/app/findGames');
    };

    onDisconnect = () => {
    };

    createGame = (game) => {
        this.clientRef.sendMessage('/app/createGame', JSON.stringify(game));
    };

    joinGame = () => {

    };


    onMessageReceive = (games, topic) => {
        if (topic == '/topic/findGames') {
            this.setState(state => ({...state, games: games}))
        }

        if (topic == '/topic/createGame') {
            debugger
            this.setState(state => ({...state, games: [...this.state.games, games]}))
        }
    };

    render() {
        return (
            <div>
                <SockJsClient url={"http://localhost:8080/handler"}
                              topics={
                                  ['/topic/findGames',
                                      '/queue/player1Game',
                                      '/user/queue',
                                      '/topic/createGame']}
                              onMessage={this.onMessageReceive}
                              onConnect={this.onConnect}
                              onDisconnect={this.onDisconnect}
                              ref={(client) => {
                                  this.clientRef = client
                              }}/>

                <App games={this.state.games}
                     createGame={this.createGame.bind(this)}/>

            </div>
        )
    }
};
