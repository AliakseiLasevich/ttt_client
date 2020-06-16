import React from "react";
import GameThumbnail from "./GameThumbnail";
import style from "./AvailableGames.module.css";
import SockJsClient from "react-stomp";

export class AvailableGames extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            connected: true,
        }
    }

    onConnect = () => {
        this.clientRef.sendMessage('/app/availableGames');
    };

    onDisconnect = () => {
    };

    onMessageReceive = (games, topic) => {
        if (topic == '/topic/availableGames') {
            let availableGames = games.map(game => <GameThumbnail tag={game.tag}/>)
            this.setState(state => ({...state, games: availableGames}))
        }

        if (topic == '/topic/createGame') {
            let newGame = <GameThumbnail tag={games.tag}/>;
            this.setState(state => ({...state, games: [...this.state.games, newGame]}))
        }
    }
    ;


    render() {
        return (
            <div>
                <div>{this.state.connected ? null : " service offline"}</div>

                <div className={style.AvailableGames}>{this.state.connected && this.state.games}</div>

                <SockJsClient url={"http://localhost:8080/handler"}
                              topics={['/topic/availableGames', '/topic/createGame']}
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
