import React, { Component, SyntheticEvent } from 'react';
import './styles.css';

import socket from '../../services/socket';
import sendIcon from '../../assets/send-button.svg';

interface Message {
    username: string,
    msg: string
}

interface IState {
    messageText: string,
    messages: Array<Message>,
    username: string,
}

interface IProps {}

class App extends Component<IProps, IState> {
    
    state: IState = {
        messageText: '',
        messages: [],
        username: '',
    }

    textInputChanged = (textInput: string) => {
        let newState: IState = {...this.state};
        
        if (this.state.messageText !== textInput) {
            newState.messageText = textInput;
            
            this.setState(newState);
        }
    }

    componentDidMount() {
        socket.on('take all messages', (messages: Array<Message>) => {
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

    componentWillUnmount() {
        socket.off('take your name');
        socket.off('take all messages');
    }

    sendMessage = (event: SyntheticEvent) => {
        event.preventDefault();

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
                            return <li key={index} className={'message ' + (item.username === this.state.username ? 'sent': 'received')}>{item.username}: {item.msg}</li>
                        })}
                    </ul>
                </div>
                <form className="text-input" onSubmit={(e) => this.sendMessage(e)}>
                    <input type="text" onChange={(e) => this.textInputChanged(e.target.value)} value={this.state.messageText} />
                    <button type="submit">
                        <img src={sendIcon} alt="send icon"/>
                    </button>
                </form>
            </div>
        )
    }
}

export default App;