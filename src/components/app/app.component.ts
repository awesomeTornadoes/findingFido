import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  //styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'FindingFido';
  constructor(public authService: AuthService) { 
    //authService.handleAuthentication();
  }



 }



// Every Angular application requires at least one component called a root component.
// All other components will reside in this primary root component.
// An application may only have one root component.
//app.component.ts is the standard file name for root components.