import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-reviews',
  templateUrl: './client-reviews.component.html',
  styleUrls: ['./client-reviews.component.css'],
})
export class ClientReviewsComponent implements OnInit {
  user: any = {};
  commentsData: any;
  restaurantsData: any;
  p: number = 1;
  pagedComments: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUtilizador();
  }

  pageChanged(event: any): void {
    const startIndex = (event.page - 1) * 3;
    this.pagedComments = this.commentsData.slice(startIndex, startIndex + 3);
  }

  getUtilizador() {
    const usertoken = localStorage.getItem('usertoken');
    if (usertoken) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${usertoken}`
      );
      this.http
        .get(`http://localhost:3005/users/${this.getUtilizadorId()}`, {
          headers,
        })
        .subscribe(
          (res: any) => {
            this.user = res;
          },
          (error) => {
            console.error('Erro ao obter dados do utilizador: ', error);
          }
        );
    }
  }

  getUtilizadorId() {
    const usertoken = localStorage.getItem('usertoken');
    if (usertoken) {
      const usertokenParts = usertoken.split('.');
      if (usertokenParts.length === 3) {
        const userdecodedToken = atob(usertokenParts[1]);
        const usertokenInfo = JSON.parse(userdecodedToken);
        return usertokenInfo.id;
      }
    }
    return null;
  }
}
