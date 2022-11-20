import socketIoClient from "socket.io-client";

const host = "http://localhost:8000";

export default socketIoClient(host) as SocketIOClient.Socket;
