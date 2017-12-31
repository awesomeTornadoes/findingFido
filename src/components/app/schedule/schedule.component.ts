import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { PageService } from '../services/page.service';
import { Router } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: 'schedule.component.html',
  styles: [ ]
})
  
export class ScheduleComponent {
  time: string;
  activities: any;
  userProfile: any;
  petProfile: any;
  activity: any;
  map: any;

  constructor(
    private router: Router,
    private pageService: PageService,
    private sanitizer: DomSanitizer
  ) { }

  onSelect(): void {
    const time = this.time;
    this.pageService.getActivities(time)
      .then(activities => {
        this.activities = activities;
      })
  }
  onSelectActivity(activity): void {
    const email = activity.email_user;
    console.log(email);
    this.pageService.getDashboard(email)
      .then(information => {
        this.userProfile = information.userInfo;
        this.petProfile = information.petInfo;
        console.log(this.userProfile);
        console.log(this.petProfile);
        this.router.navigate(['/pet-dashboard', this.petProfile.id]);

      })
  }
  onHover(activity): void {
    console.log(activity.location);
    this.map = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBfz7Y7C-7emBWPSEi925MBpeXLRcL-Jzw&q=${activity.location},New+Orleans,LA`
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
