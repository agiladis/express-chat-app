'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat', (msg) => {
    console.log('outgoing message: ' + msg);
    io.emit('chat', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnexted');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
