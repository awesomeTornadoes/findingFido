import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { PageService } from '../services/page.service';


@Component({
  selector: 'review',
  templateUrl: 'review.component.html',
  //styleUrls: ['review.component.css']
})
export class ReviewComponent {
  name: string;


  constructor(
    private router: Router,
    public authService: AuthService,
    private pageService: PageService
  ) { }

  onSelect(): void {
    this.router.navigate(['/dashboard']);

  }
}



