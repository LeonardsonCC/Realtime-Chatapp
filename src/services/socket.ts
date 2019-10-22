import socketIoClient from 'socket.io-client';

const host = process.env.SERVER;

export default socketIoClient(host) as SocketIOClient.Socket;