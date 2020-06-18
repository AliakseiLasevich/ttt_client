import React from "react";
import SockJsClient from "react-stomp";
import App from "../../App";

export class WebSocketStateHOC extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            games: [],
            userId: null,
            // connected: true,
            opponentId: null,
            currentGameId: null,
            moveEquivalent: null,
            topics: ['/topic/findGames',
                '/topic/createGame',
                '/user/queue/getSessionId',
                '/user/queue/opponent',
                '/user/queue/sessionId',
                '/user/queue/move'
            ]
        }
    }

    onConnect = () => {
        this.requestGamesList();
        this.requestSessionId();
    };

    requestGamesList = () => {
        this.clientRef.sendMessage('/app/findGames');
    };

    requestSessionId = () => {
        this.clientRef.sendMessage("/app/getSessionId");
    };

    requestCreateGame = (game) => {
        this.clientRef.sendMessage('/app/createGame', JSON.stringify(game));
    };

    requestJoinGame = (gameId) => {
        debugger
        this.clientRef.sendMessage('/app/joinGame', JSON.stringify(gameId));
        this.setState(state => ({...state, moveEquivalent: 1, currentGameId: gameId}))
        this.refreshGamesList();
    };

    requestMove = (cellId) => {
        let moveDto = {
            gameId: this.state.currentGameId,
            cellId: cellId,
            moveEquivalent: this.state.moveEquivalent,
            userId: this.state.userId,
            opponentId: this.state.opponentId
        };
        debugger
        this.clientRef.sendMessage(`/app/move`, JSON.stringify(moveDto));
    };

    onMessageReceive = (message, topic) => {

        if (topic === '/topic/findGames') {
            this.refreshGamesList(message);
            return;
        }

        if (topic === '/topic/createGame') {
            this.createNewGame(message);
            return;
        }

        if (topic === '/user/queue/opponent') {
            this.setOpponentId(message);
            return;
        }

        if (topic === '/user/queue/sessionId') {
            this.setUserId(message);
            return;
        }

        if (topic === '/user/queue/move') {
            console.log(message);
            return;
        }


    };

    refreshGamesList = (games) => {
        this.setState(state => ({...state, games: games}))
    };

    createNewGame = (game) => {
        debugger
        this.setState(state => ({
            ...state,
            games: [...this.state.games, game],
            currentGameId: game.id,
            moveEquivalent: 10
        }));
        debugger
    };

    setOpponentId = (opponentId) => {
        this.setState(state => ({...state, opponentId: opponentId}));
    };

    setUserId = (userId) => {
        this.setState(state => ({
            ...state,
            userId: userId
        }))
    };


    render() {
        return (
            <div>
                <SockJsClient url={"http://localhost:8080/handler"}
                              topics={this.state.topics}
                              onMessage={this.onMessageReceive}
                              onConnect={this.onConnect}
                              ref={(client) => {
                                  this.clientRef = client
                              }}/>

                <App games={this.state.games}
                     refreshGamesList={this.refreshGamesList.bind(this)}
                     createGame={this.requestCreateGame.bind(this)}
                     joinGame={this.requestJoinGame.bind(this)}
                     opponent={this.state.opponentId}
                     move={this.requestMove.bind(this)}/>

            </div>
        )
    }
}
