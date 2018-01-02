import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { ChatService } from './../services/chat.service';
import { Router } from '@angular/router';
import * as io from "socket.io-client";


@Component({
  templateUrl: 'chat.component.html',
  //styleUrls: ['chat.component.css']
})
export class ChatComponent {
  socket = io('http://localhost:9000');
  profile: any;
  room: string = 'Room1';
  message: string;
  messages: any = []

  constructor(
    private router: Router,
    public authService: AuthService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    if (this.authService.userProfile) {
      this.profile = this.authService.userProfile;
    } else {
      this.authService.getProfile((err, profile) => {
        this.profile = profile;
      });
    }

    this.socket.on('new-message', function (data) {
      this.messages.push(data.message);
    }.bind(this));

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
      .then(chat => {
        this.socket.emit('save-message', chat);
        console.log(chat);
      })
    .catch(err=>console.log(err))
    this.message = '';
  }

}




