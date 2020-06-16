import React from 'react';
import SockJsClient from 'react-stomp';


export class MessageComponent extends React.Component {

    constructor(props) {
        debugger
        super(props);
        this.state = {
            clientConnected: false,
            messages: []
        }
    }

    sendMessage = (msg) => {
        debugger
        console.log(`message: ${msg}`);
        this.clientRef.sendMessage('/app/createGame', JSON.stringify(msg));
    };

    onMessageReceive = (msg, topic) => {
        debugger
        console.log(`topic: ${topic}`);
        console.log(`onMessage. msg: ${msg}`)
        // this.setState(prevState => ({
        //     messages: [...prevState.messages, msg]
        // }))
    };

    componentDidMount() {
        this.setState({messages: ['abcd']})
    }

    render() {
        const wsSourceUrl = 'http://localhost:8080/handler';
        return (
            <div>
                <SockJsClient url={wsSourceUrl}
                              topics={['/topic/availableGames']}
                              onMessage={this.onMessageReceive}
                              ref={(client) => {this.clientRef = client}}
                              onConnect={() => {
                              }}
                              onDisconnect={() => {
                              }}/>

                <button onClick={() => this.sendMessage("A")}>sendMSG</button>

            </div>
        );
    }
}