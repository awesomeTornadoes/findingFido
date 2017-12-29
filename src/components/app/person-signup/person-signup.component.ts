import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import { AuthService } from './../auth/auth.service';


@Component({
  selector: 'person-signup',
  templateUrl: 'person-signup.component.html',
  //styleUrls: ['person-signup.component.css']
})
export class PersonComponent implements OnInit {
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  extra: string;
  profile: any;

  constructor(
    private router: Router,
    private emailService: EmailService,
    public authService: AuthService,
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

  onSelect(): void {
    const personInfo = {
      name: this.name,
      address1: this.address1,
      address2: this.address2,
      city: this.city,
      state: this.state,
      zip: this.zip,
      extra: this.extra,
      profile: this.profile,
    }
    console.log(personInfo);
    this.emailService.postPersonSignUp(personInfo)
    .then(user => console.log('yep fired',user))
    this.router.navigate(['/dashboard']);

  }
}



