import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) { }

  isScrolled: boolean = false;
  responsavel: any = {};

  ngOnInit() {
    this.onWindowScroll();
    this.getResponsavel();
  }

  getResponsavel() {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get(`http://localhost:3005/restaurantresponsibles/${this.getUserId()}`, { headers })
        .subscribe((res: any) => {
          this.responsavel = res;
          console.log(res);
        }, (error) => {
          console.error('Erro ao obter dados do responsável: ', error);
        });
    }
  }

  getUserId() {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const decodedToken = atob(tokenParts[1]);
        const tokenInfo = JSON.parse(decodedToken);
        return tokenInfo.id;
      }
    }
    return null;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/Authentication/login-responsibles']);
  }
}
