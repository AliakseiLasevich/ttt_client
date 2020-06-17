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
        this.refreshGamesList();
    };

    onDisconnect = () => {
    };


    refreshGamesList = () => {
        this.clientRef.sendMessage('/app/findGames');
    };

    createGame = (game) => {
        this.clientRef.sendMessage('/app/createGame', JSON.stringify(game));
    };

    joinGame = (playerOneId) => {
        this.clientRef.sendMessage('/app/joinGame', JSON.stringify(playerOneId));
        this.refreshGamesList();
    };

    notifyPlayerOne = (playerOne) => {
        this.clientRef.sendMessage(`/user/queue/${playerOne}`, `ATATA`)
    };

    onMessageReceive = (message, topic) => {

        if (topic === '/topic/findGames') {
            this.setState(state => ({...state, games: message}))
        }

        if (topic === '/topic/createGame') {

            this.setState(state => ({...state, games: [...this.state.games, message]}))
        }

        // if (topic === '/user/queue/game') {
        //     this.notifyPlayerOne(message.playerOne);
        // }

    };

    render() {
        return (
            <div>
                <SockJsClient url={"http://localhost:8080/handler"}
                              topics={
                                  ['/topic/findGames',
                                      '/queue/player1Game',
                                      '/user/queue',
                                      '/user/queue/game',
                                      '/topic/createGame',
                                      '/user/user/queue/',
                                  ]}
                              onMessage={this.onMessageReceive}
                              onConnect={this.onConnect}
                              onDisconnect={this.onDisconnect}
                              ref={(client) => {
                                  this.clientRef = client
                              }}/>

                <App games={this.state.games}
                     refreshGamesList={this.refreshGamesList.bind(this)}
                     createGame={this.createGame.bind(this)}
                     joinGame={this.joinGame.bind(this)}/>

            </div>
        )
    }
};
