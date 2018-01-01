const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// socket io
io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  socket.on('save-message', (data) => {
    console.log(data);
    io.emit('new-message', { message: data });
  });
});
