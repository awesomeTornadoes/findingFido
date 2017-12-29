import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';



@Component({
  selector: 'pet-dashboard',
  templateUrl: 'pet-dashboard.component.html',
  //styleUrls: ['pet-dashboard.component.css']
})
export class PetDashboardComponent {
  name: string;


  constructor(
    private router: Router,
    public authService: AuthService,

  ) { }

  onSelect(): void {
    this.router.navigate(['/chat']);

  }
}



