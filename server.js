// import express module
var express = require('express');
// import socket.io module
var socket = require('socket.io');



// set up the express app
var app = express();
// set up server
var server = app.listen(4000,()=>{
    console.log("listening to port 4000");
});

// server static files
app.use(express.static('public'));

// set up socket.io on sever.
var io = socket(server);
io.on('connection', (socket)=>{
    console.log("made socket connection", socket.id);

    socket.on('chat',(data)=>{
        io.sockets.emit('chat',data);
    });

    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data);
    });
})