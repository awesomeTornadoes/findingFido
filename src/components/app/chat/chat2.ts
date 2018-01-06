import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from './../services/chat.service';
// Import Socket.io
import * as io from "socket.io-client";


@Component({
  templateUrl: 'chat.component.html',
})
  
export class ChatComponent {
  // the url is the one of our back end road
  socket = io('http://localhost:8080');
  room: string = 'Room1';
  message: string;
  messages: any = []

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    // we are listening for new messages and pushing those messages into our messages variable
    this.socket.on('new-message', function (data) {
      this.messages.push(data.message);
    }.bind(this));

  }

  // On Sending messages we post it to our database, and emit a "save-message" event 
  // We are listening to those new messages above
  sendMessage(message, room): void {
    room = room;
    const chatMessage = {
      text: message,
      room: room
    }
    this.chatService.postMessage(chatMessage)
      .then(chat => {
        this.socket.emit('save-message', chat);
      })
    .catch(err=>console.log(err))
    this.message = '';
  }

}




