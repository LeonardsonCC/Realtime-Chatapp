let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let faker = require('faker');

let messages = [];
let users = [];

// Socket Events
io.on('connection', function (socket) {
    let username = faker.internet.userName();
    console.log(username + ' connected');
    socket.emit('take all messages', messages);
    socket.emit('take your name', username);
    users.push(username);

    socket.on('send message', function (msg) {
        messages.push({ username, msg });
        console.log(messages);
        socket.emit('take all messages', messages);
        socket.broadcast.emit('take all messages', messages);
    });
    
    socket.on('disconnect', function () {
        console.log(username + ' disconnected');
    });    
});


http.listen(3000, function () {
    console.log('listening on 127.0.0.1:3000');
});