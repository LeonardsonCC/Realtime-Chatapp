import socketIoClient from 'socket.io-client';

const host = 'leonardson.netlify.com:3000';

export default socketIoClient(host) as SocketIOClient.Socket;