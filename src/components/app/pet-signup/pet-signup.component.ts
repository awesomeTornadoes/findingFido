import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { EmailService } from '../services/email.service';


@Component({
  selector: 'pet-signup',
  templateUrl: 'pet-signup.component.html',
  //styleUrls: ['pet-signup.component.css']
})
export class PetComponent implements OnInit{
  kind: string;
  petName: string;
  place: string;
  petInfo: string;
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
    const pet = {
      kind: this.kind,
      petName: this.petName,
      place: this.place,
      petInfo: this.petInfo,
      profile: this.profile,
    }
    console.log(pet);
    this.emailService.postPetSignUp(pet)
    .then(user => console.log('yep fired',user))
    this.router.navigate(['/person-signup']);

  }
}



