import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { PageService } from '../services/page.service';



@Component({
  templateUrl: 'dashboard.component.html',
  //styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pet: boolean;
  personNeeded: boolean;
  schedule: string;
  pickup: string;
  walker: any;
  profile: any;


  constructor(
    private router: Router,
    public authService: AuthService,
    private pageService: PageService
  ) { }

  ngOnInit() {
    if (this.authService.userProfile) {
      this.profile = this.authService.userProfile;
    } else {
      this.authService.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

  onSelectFriend(): void {
    this.router.navigate(['/schedule']);
  }
  onSelectPet(): void {
    this.pet = true;
  }
  onSelect(): void {
    this.personNeeded = true;
    const walker = {
      schedule: this.schedule,
      place: this.pickup,
      profile: this.profile,
    }
    console.log(walker);
  }


 }




// Every Angular application requires at least one component called a root component.
// All other components will reside in this primary root component.
// An application may only have one root component.
//app.component.ts is the standard file name for root components.