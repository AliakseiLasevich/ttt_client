import React from 'react';
import SockJsClient from 'react-stomp';


export class MessageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clientConnected: false,
            messages: []
        }
    }

    sendMessage = (msg) => {
        console.log(msg);
        this.clientRef.sendMessage('/app/allGames', JSON.stringify(msg));
    };

    onMessageReceive = (msg, topic) => {
console.log(msg);
console.log(topic);
        alert(('on message'))
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
                {wsSourceUrl}
                <SockJsClient url={wsSourceUrl}
                              topics={['/topic/allGames']}
                              onMessage={this.onMessageReceive}
                              ref={(client) => {this.clientRef = client}}
                              onConnect={() => alert("connected!")}
                              onDisconnect={() => alert("disconnect")}/>

                <SockJsClient url={wsSourceUrl}
                              topics={['/topic/createGame']}
                              onMessage={()=> alert(('on message'))}
                              ref={(client) => {this.clientRef = client}}
                              onConnect={() => alert("connected!")}
                              onDisconnect={() => alert("disconnect")}/>

                <button onClick={()=>this.sendMessage("asdasd")}>sendMSG</button>

            </div>
        );
    }
}