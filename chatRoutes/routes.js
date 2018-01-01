const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Message = require('../models/Message');

io.on('connection', (socket) => {

  console.log('user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('add-message', (message) => {
    io.emit('message', { type: 'new-message', text: message });
    // Function above that stores the message in the database
    databaseStore(message);
  });

});

app.post('/chat', (req, res) => {
  const userEmail = req.body.profile.email;
  const { text, room } = req.body;
  // Store message in databse
  Message.createMessage(text, room, userEmail, (err, result) => {
    // Send message to both users, using socket.io
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});