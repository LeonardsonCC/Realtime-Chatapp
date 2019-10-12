import React, { Component } from 'react';
import './styles.css';

import io from 'socket.io-client';

interface Message {
    username: string,
    msg: string
}

interface IState {
    messageText: string,
    messages: Array<Message>,
    username: string,
    endpoint: string
}

interface IProps {}

class App extends Component<IProps, IState> {
    
    state: IState = {
        messageText: '',
        messages: [],
        username: '',
        endpoint: '127.0.0.1:3000'
    }
    
    socket: SocketIOClient.Socket = io(this.state.endpoint);

    textInputChanged = (textInput: string) => {
        let newState: IState = {...this.state};
        
        if (this.state.messageText !== textInput) {
            newState.messageText = textInput;
            
            this.setState(newState);
        }
    }

    componentDidMount() {
        this.socket.on('take all messages', (messages: Array<Message>) => {
            console.log('teste');
            let newState: IState = {...this.state};
            newState.messages = messages;            
            this.setState(newState);
        });

        this.socket.on('take your name', (username: string) => {
            this.setState({
                username: username
            })
        });
    }

    componentWillUnmount() {
        this.socket.off('take your name');
        this.socket.off('take all messages');
    }

    clickButton = () => {
        this.socket.emit('send message', this.state.messageText);

        this.setState({
            messageText: ''
        });
    }

    render () {
        return (
            <div className="App">
                <div className="chat-box">
                    <ul className="chat-list">
                        {this.state.messages.map((item, index) => {
                            return <li key={index}>{item.username}: {item.msg}</li>
                        })}
                    </ul>
                </div>
                <div className="text-input">
                    <input type="text" onChange={(e) => this.textInputChanged(e.target.value)} value={this.state.messageText} />
                    <button onClick={this.clickButton}>Send</button>
                </div>
            </div>
        )
    }
}

export default App;