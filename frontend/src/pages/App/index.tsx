import React, { Component } from 'react';
import './styles.css';

import socket from '../../services/socket';

interface Message {
    username?: string,
    msg?: string
}

interface IState {
    messageText: string,
    messages: Array<Message>,
    username: string
}

interface IProps {}

class App extends Component<IProps, IState> {
    state: IState = {
        messageText: '',
        messages: [],
        username: ''
    }

    textInputChanged = (textInput: string) => {
        let newState: IState = {...this.state};
        
        if (this.state.messageText !== textInput) {
            newState.messageText = textInput;
            
            this.setState(newState);
        }
    }

    componentDidMount() {
        socket.on('new message', (messages: Array<Message>) => {
            let newState: IState = {...this.state};
            newState.messages = messages;            
            this.setState(newState);
        });

        socket.on('take your name', (username: string) => {
            this.setState({
                username: username
            })
        });
    }

    clickButton = () => {
        socket.emit('send message', this.state.messageText);

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