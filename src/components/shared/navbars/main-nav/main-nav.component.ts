import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  isScrolled: boolean = false;

  token: string | null = localStorage.getItem('token');
  flname: string | null = localStorage.getItem('flname');
  image: string | null = localStorage.getItem('image') || '../../../../assets/defaultuser.png';

  constructor(private router: Router) { }

  ngOnInit() {
    this.onWindowScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('flname');
    this.router.navigate(['/Authentication/login-responsibles'])
  }

}
