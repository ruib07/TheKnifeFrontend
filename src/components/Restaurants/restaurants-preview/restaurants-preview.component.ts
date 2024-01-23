import { HttpClient } from '@angular/common/http';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

@Component({
  selector: 'app-restaurants-preview',
  templateUrl: './restaurants-preview.component.html',
  styleUrls: ['./restaurants-preview.component.css']
})
export class RestaurantsPreviewComponent implements OnInit {
  selectedDate: any;
  restaurantId: any = {};
  restaurantData: any;
  minDate: any; 

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { 
    registerLocaleData(localePt, 'pt-BR'),
    this.minDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurantId = +params['id'];
      this.getRestaurantInfo();
    });
  }


  onDateChange(date: any) {
    console.log('Data selecionada:', date);
  }

  redirectToReservations() {
    this.router.navigate(['/reservations']);
  }

  getRestaurantInfo() {
    this.http.get('http://localhost:3005/restaurants').subscribe(
      (res: any) => {
        console.log('Response from server:', res);

        const selectedRestaurant = res.find((restaurant:any) => restaurant.id === this.restaurantId);

        if (selectedRestaurant) {
          this.restaurantData = selectedRestaurant;
          console.log('Restaurant data:', this.restaurantData);
        } else {
          console.error('Restaurante não encontrado. Restaurant ID:', this.restaurantId);
        }
      },
      (error) => {
        console.error('Erro ao obter restaurantes: ', error);
      }
    );
  }
}
