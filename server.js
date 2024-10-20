'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello world');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
