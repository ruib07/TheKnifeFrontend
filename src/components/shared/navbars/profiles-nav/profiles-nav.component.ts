import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiles-nav',
  templateUrl: './profiles-nav.component.html',
  styleUrls: ['./profiles-nav.component.css']
})
export class ProfilesNavComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  responsavel: any = {};

  ngOnInit() {
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

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/Authentication/login-responsibles']);
  }

}
