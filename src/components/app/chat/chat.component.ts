import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { ChatService } from './../services/chat.service';
import { Router } from '@angular/router';


@Component({
  templateUrl: 'chat.component.html',
  //styleUrls: ['chat.component.css']
})
export class ChatComponent { 
  connection;
  profile: any;
  room: string = 'Room1';
  message: string;
  messages: any = [
    { text: 'Hello my name is Anna' },
    { text: 'Hello world' },
    { text: 'Hello you' },
    { text: 'Hello there' }
  ]
  
  constructor(
    private router: Router,
    public authService: AuthService,
    private chatService: ChatService
  ) {}
  
  ngOnInit() {
    if (this.authService.userProfile) {
      this.profile = this.authService.userProfile;
    } else {
      this.authService.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
    
    setTimeout(() => {
      this.getMessages();
    }, 2000);
    // this.connection = this.chatService.getMessages(this.profile.email, this.room).subscribe(message => {
    //   this.messages.push(message);
    // })
  }
  
  // ngOnDestroy() {
  //   this.connection.unsubscribe();
  // }

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

  getMessages(): void {
    this.chatService.getMessages(this.profile.email, this.room)
      .then(chat => {
        this.messages = chat;
        console.log(chat)
      })
  }  

}




