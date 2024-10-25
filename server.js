'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join room', (room) => {
    socket.join(room);
    console.log(`user joined room: ${room}`);
  });

  socket.on('chat', (msg) => {
    console.log('outgoing message: ' + msg);
    io.to(room).emit('chat', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnexted');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
