import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurants-page',
  templateUrl: './restaurants-page.component.html',
  styleUrls: ['./restaurants-page.component.css'],
})
export class RestaurantsPageComponent implements OnInit {
  restaurants: any = {};

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getRestaurants();
  }

  getRestaurants() {
    this.http.get('http://localhost:3005/restaurants').subscribe(
      (res) => {
        this.restaurants = res;
        console.log(this.restaurants);
      },
      (error) => {
        console.error('Erro ao obter restaurantes: ', error);
      }
    );
  }

  goToRestaurantPreview(restaurantId: number) {
    this.router.navigate(['/Restaurants/restaurants-preview', restaurantId]);
  }
}
