import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {WebSocketHOC} from "./components/stomp/WebSocketHOC";


ReactDOM.render(
    <WebSocketHOC/>,
    document.getElementById('root')
);

serviceWorker.unregister();
