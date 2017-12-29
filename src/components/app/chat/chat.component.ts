import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  templateUrl: 'chat.component.html',
  //styleUrls: ['chat.component.css']
})
export class ChatComponent { 
  constructor(
    private router: Router,
    public authService: AuthService,
  ) { }
}




// Every Angular application requires at least one component called a root component.
// All other components will reside in this primary root component.
// An application may only have one root component.
//app.component.ts is the standard file name for root components.