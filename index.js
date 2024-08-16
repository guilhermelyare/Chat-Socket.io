const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('set username', (username) => {
        socket.username = username;
        console.log(`${username} has connected`);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', {
            username: socket.username,
            message: msg
        });
    });

    socket.on('disconnect', () => {
        console.log(`${socket.username} disconnected`);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
