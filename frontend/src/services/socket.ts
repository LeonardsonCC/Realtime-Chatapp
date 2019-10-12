import socketIoClient from 'socket.io-client';

const host = '127.0.0.1:3000';

export default socketIoClient(host) as SocketIOClient.Socket;