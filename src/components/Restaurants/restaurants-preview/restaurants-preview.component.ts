import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurants-preview',
  templateUrl: './restaurants-preview.component.html',
  styleUrls: ['./restaurants-preview.component.css']
})
export class RestaurantsPreviewComponent implements OnInit {

  restaurantId: any = {};
  restaurantData: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurantId = +params['id'];
      this.getRestaurantInfo();
    });
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
