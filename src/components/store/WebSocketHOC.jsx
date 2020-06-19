import React from "react";
import SockJsClient from "react-stomp";
import App from "../../App";

export class WebSocketHOC extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            games: [],
            userId: null,
            opponentId: null,
            userMoves: [],
            opponentMoves: [],
            currentGameId: null,
            moveEquivalent: null,
            userTurn: false,
            winnerId: null,
            isTie: null,
            topics: ['/topic/findGames',
                '/topic/createGame',
                '/user/queue/getSessionId',
                '/user/queue/opponent',
                '/user/queue/sessionId',
                '/user/queue/move',
                '/user/queue/gameOver',
                '/user/queue/tie',
            ]
        }
    };

    resetState = () => {
        debugger
        this.onConnect();
        this.setState(this.getInitialState());
    };


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
        this.clientRef.sendMessage('/app/joinGame', JSON.stringify(gameId));
        this.setState(state => ({...state, moveEquivalent: 1, currentGameId: gameId, userTurn: false}))
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
        this.clientRef.sendMessage(`/app/move`, JSON.stringify(moveDto));
        this.setState(state => ({...state, userMoves: [...this.state.userMoves, cellId]}))
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
            let opponentMove = message.opponentCellId;
            this.setState(state => ({...state, opponentMoves: [...this.state.opponentMoves, opponentMove]}));
            this.toggleUserTurn();
            return;
        }
        if (topic === '/user/queue/gameOver') {
            this.setWinnerId(message.winnerId);
            return;
        }
        if (topic === '/user/queue/tie') {
            this.setTie();
            return;
        }
    };

    refreshGamesList = (games) => {
        this.setState(state => ({...state, games: games}))
    };

    createNewGame = (game) => {
        this.setState(state => ({
            ...state,
            games: [...this.state.games, game],
            currentGameId: game.id,
            moveEquivalent: 10,
            userTurn: true
        }));
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

    setTie = () => {
        this.setState(state => ({...state, isTie: true}))
    };

    toggleUserTurn = () => {
        this.setState(state => ({...state, userTurn: !this.state.userTurn}))
    };

    setWinnerId = (winnerId) => {
        this.setState(state => ({...state, winnerId: winnerId}))
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
                     move={this.requestMove.bind(this)}
                     userTurn={this.state.userTurn}
                     toggleUserTurn={this.toggleUserTurn.bind(this)}
                     moveEquivalent={this.state.moveEquivalent}
                     opponentMoves={this.state.opponentMoves}
                     userMoves={this.state.userMoves}
                     winnerId={this.state.winnerId}
                     userId={this.state.userId}
                     isTie={this.state.isTie}
                     resetState={this.resetState}/>

            </div>
        )
    }
}
