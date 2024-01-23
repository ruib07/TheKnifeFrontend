import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css'],
})
export class BookingHistoryComponent implements OnInit {
  private datePipe = new DatePipe('en-US');
  restaurantId: any = {};
  restaurantData: any;
  reservationData: any;
  user: any = {};
  restaurantsMap: Map<number, any> = new Map();
  p: number = 1;
  pagedReservations: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getUtilizador();
    this.getReservationInfo();
  }

  formatDate(date: string): string {
    const parsedDate = new Date(date);

    return this.datePipe.transform(parsedDate, 'dd-MM-yyyy') || '';
  }

  pageChanged(event: any): void {
    const startIndex = (event.page - 1) * 6;
    this.pagedReservations = this.reservationData.slice(
      startIndex,
      startIndex + 6
    );
  }

  getReservationInfo() {
    this.http.get('http://localhost:3005/reservations').subscribe(
      (reservations: any) => {
        this.reservationData = reservations.filter(
          (reservation: any) => reservation.user_id === this.getUtilizadorId()
        );

        this.http.get('http://localhost:3005/restaurants').subscribe(
          (restaurants: any) => {
            this.restaurantsMap = new Map(
              restaurants.map((restaurant: any) => [restaurant.id, restaurant])
            );

            this.reservationData.forEach((reservation: any) => {
              const restaurantInfo = this.restaurantsMap.get(
                reservation.restaurant_id
              );

              if (restaurantInfo) {
                reservation.restaurant_name = restaurantInfo.name;
              }
            });

            this.pageChanged({ page: this.p });
          },
          (error) => {
            console.error('Erro ao obter restaurantes: ', error);
          }
        );
      },
      (error) => {
        console.error('Erro ao obter reservas: ', error);
      }
    );
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
            this.user = {
              username: res.username,
              email: res.email,
              password: res.password,
              image: res.image,
            };
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
