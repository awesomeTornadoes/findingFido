import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from '../services/page.service';


@Component({
  selector: 'pet-boolean',
  templateUrl: 'pet-boolean.component.html',
  //styleUrls: ['pet-boolean.component.css']
})
export class PetBooleanComponent {
  name: string;


  constructor(
    private router: Router,
    private pageService: PageService
  ) { }

  onSelectPet(): void {
    const personInfo = {
      name: this.name,
    }
    console.log(personInfo);
    this.pageService.postSchedule(personInfo)
      .then(user => console.log('yep fired', user))
    this.router.navigate(['/pet-signup']);

  }
  onSelectFriend(): void {
    const personInfo = {
      name: this.name,
    }
    console.log(personInfo);
    this.pageService.postSchedule(personInfo)
      .then(user => console.log('yep fired', user))
    this.router.navigate(['/person-signup']);

  }
}



