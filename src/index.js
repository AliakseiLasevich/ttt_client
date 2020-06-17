import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {WebSocketStateHOC} from "./components/stomp/WebSocketStateHOC";


ReactDOM.render(
    <WebSocketStateHOC/>,
    document.getElementById('root')
);

serviceWorker.unregister();
