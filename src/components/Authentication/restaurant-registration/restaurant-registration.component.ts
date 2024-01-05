import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-restaurant-registration',
  templateUrl: './restaurant-registration.component.html',
  styleUrls: ['./restaurant-registration.component.css']
})
export class RestaurantRegistrationComponent {
  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  showSuccess() {
    this.toastr.success('Registo efetuado com sucesso!');
  }
  showError() {
    this.toastr.error('Erro ao efetuar registo!');
  }

  sendRestaurantRegistration(registerrestaurantsresponsibles: {
    flname: string, phone: number, email: string,
    password: string, name: string, category: string, desc: string,
    rphone: number, location: string, image: string, numberoftables: number,
    capacity: number, openingdays: string, averageprice: number, openinghours: string, closinghours: string,
  }) {
    this.http.post('http://localhost:3005/restaurantregistrations', registerrestaurantsresponsibles)
      .subscribe((res: any) => {
        const userDataForResponsiblesTable = {
          flname: registerrestaurantsresponsibles.flname,
          phone: registerrestaurantsresponsibles.phone,
          email: registerrestaurantsresponsibles.email,
          password: registerrestaurantsresponsibles.password,
          restaurantregistration_id: res.id
        };

        this.http.post('http://localhost:3005/auths/responsiblesignup', userDataForResponsiblesTable)
          .subscribe((responsibleRes: any) => {
            const userDataForRestaurants = {
              name: registerrestaurantsresponsibles.name,
              category: registerrestaurantsresponsibles.category,
              desc: registerrestaurantsresponsibles.desc,
              rphone: registerrestaurantsresponsibles.rphone,
              location: registerrestaurantsresponsibles.location,
              image: registerrestaurantsresponsibles.image,
              numberoftables: registerrestaurantsresponsibles.numberoftables,
              capacity: registerrestaurantsresponsibles.capacity,
              openingdays: registerrestaurantsresponsibles.openingdays,
              averageprice: registerrestaurantsresponsibles.averageprice,
              openinghours: registerrestaurantsresponsibles.openinghours,
              closinghours: registerrestaurantsresponsibles.closinghours,
              restaurantregistration_id: res.id,
              rresponsible_id: responsibleRes[0].id,
            };

            this.http.post('http://localhost:3005/restaurants', userDataForRestaurants)
              .subscribe((restaurantRes) => {
                console.log("Registered new restaurant: " + restaurantRes);
                this.showSuccess();
              });
          });
      },
        (error) => {
          console.error(error);
          this.showError();
      })
  }
}
