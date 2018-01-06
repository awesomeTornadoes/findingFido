import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from './../services/chat.service';


@Component({
  templateUrl: 'chat.component.html',
})
  
export class ChatComponent { 
  connection;
  profile: any;
  room: string = 'Room1';
  message: string;
  messages: any = []
  
  constructor(
    private chatService: ChatService
  ) {}
  
  ngOnInit() {

    // Polling with no socket.io
    setTimeout(() => {
      this.getMessages();
    }, 2000);
  }
  
  getMessages(): void {
    this.chatService.getMessages(this.profile.email, this.room)
      .then(chat => {
        this.messages = chat;
        console.log(chat)
      })
  }  
}
  sendMessage(message, room): void {
    room = room;
    const chatMessage = {
      profile: this.profile,
      text: message,
      room: room
    }
    console.log(chatMessage);
    this.chatService.postMessage(chatMessage)
      .then(chat => console.log(chat))
    this.message = '';
  }  





