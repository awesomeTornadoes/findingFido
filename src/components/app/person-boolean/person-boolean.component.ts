import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'person-boolean',
  templateUrl: 'person-boolean.component.html',
  //styleUrls: ['person-boolean.component.css']
})
export class PersonBooleanComponent {

  constructor(
    private router: Router,
  ) { }

  onSelectYes(): void {
    this.router.navigate(['/pet-boolean']);

  }
  onSelectNo(): void {
    this.router.navigate(['/dashboard']);
  }
}



