import React from "react";
import SockJsClient from "react-stomp";
import App from "../../App";

export class WebSocketHOC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            connected: true,
            opponentId: null,
            topics: ['/topic/findGames',
                '/user/queue/getSessionId',
                '/topic/createGame',
                '/user/queue/opponent',
                '/user/queue/sessionId'
            ]
        }
    }

    onConnect = () => {
        this.refreshGamesList();
        this.getSessionId();
    };

    onDisconnect = () => {
    };

    refreshGamesList = () => {
        this.clientRef.sendMessage('/app/findGames');
    };

    getSessionId = () => {
        this.clientRef.sendMessage("/app/getSessionId");
    };

    createGame = (game) => {
        this.clientRef.sendMessage('/app/createGame', JSON.stringify(game));
    };

    joinGame = (playerOneId) => {
        this.clientRef.sendMessage('/app/joinGame', JSON.stringify(playerOneId));
        this.refreshGamesList();
    };

    notifyOpponent = () => {
        this.clientRef.sendMessage(`/user/${this.state.opponentId}/queue/notify`,
            JSON.stringify("i'm gonna win you"))

    };

    onMessageReceive = (message, topic) => {
        if (topic === '/topic/findGames') {
            this.setState(state => ({...state, games: message}))
        }

        if (topic === '/topic/createGame') {

            this.setState(state => ({...state, games: [...this.state.games, message]}))
        }

        if (topic === '/user/queue/opponent') {
            this.setState(state => ({...state, opponentId: message}));
        }

        if (topic === '/user/queue/sessionId') {
            // subscribe to game updates and adds user id to state
            this.setState(state => ({
                ...state,
                topics: [...this.state.topics,
                    `/user/${message}/queue/notify`],
                userId: message
            }))

        }
    };

    render() {
        return (
            <div>
                <SockJsClient url={"http://localhost:8080/handler"}
                              topics={this.state.topics}
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

                <button onClick={() => {
                    this.notifyOpponent()
                }}>
                    Notify opponent
                </button>

            </div>
        )
    }
};
