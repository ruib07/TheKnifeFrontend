import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-responsible-editprofile',
  templateUrl: './responsible-editprofile.component.html',
  styleUrls: ['./responsible-editprofile.component.css'],
})
export class ResponsibleEditprofileComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private el: ElementRef
  ) {}

  responsavel: any = {};

  ngOnInit() {
    this.getResponsavel();
  }

  showSuccess() {
    this.toastr.success('Dados atualizados com sucesso!', 'Sucesso', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  showError() {
    this.toastr.error('Erro a atualizar os dados', 'Erro', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  getResponsavel() {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http
        .get(
          `http://localhost:3005/restaurantresponsibles/${this.getUserId()}`,
          { headers }
        )
        .subscribe(
          (res: any) => {
            this.responsavel = res;
            console.log(res);
          },
          (error) => {
            console.error('Erro ao obter dados do responsável: ', error);
          }
        );
    }
  }

  updateResponsavelInfo(updateResponsible: {
    flname: string;
    phone: number;
    email: string;
    password: string;
    image: string;
  }) {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http
        .put(
          `http://localhost:3005/restaurantresponsibles/${this.getUserId()}`,
          updateResponsible,
          { headers }
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            const updateForResponsibleRestaurantRes = {
              flname: updateResponsible.flname,
              phone: updateResponsible.phone,
              email: updateResponsible.email,
              password: updateResponsible.password,
            };
            this.http
              .put(
                `http://localhost:3005/restaurantregistrations/${this.getUserId()}`,
                updateForResponsibleRestaurantRes
              )
              .subscribe((res: any) => {
                console.log(res);
              });
            this.setStyle('');
            this.showSuccess();
          },
          (error) => {
            console.error(error);
            this.setStyle('1px solid #D00000');
            this.showError();
          }
        );
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

  private setStyle(style: string) {
    const flnameInput = this.el.nativeElement.querySelector('[name="flname"]');
    const phoneInput = this.el.nativeElement.querySelector('[name="phone"]');
    const emailInput = this.el.nativeElement.querySelector('[name="email"]');
    const passwordInput =
      this.el.nativeElement.querySelector('[name="password"]');
    const imageInput = this.el.nativeElement.querySelector('[name="image"]');

    if (flnameInput) {
      flnameInput.style.border = style;
    }

    if (phoneInput) {
      phoneInput.style.border = style;
    }

    if (emailInput) {
      emailInput.style.border = style;
    }

    if (passwordInput) {
      passwordInput.style.border = style;
    }

    if (imageInput) {
      imageInput.style.border = style;
    }
  }
}
