import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Login Efetuado com sucesso!');
  }

  showError() {
    this.toastr.error('Erro ao efetuar o login');
  }


  LoginUsers(loginusers: {
    email:string, password:string
  }) {
    this.http.post('http://localhost:3005/registerusers/login', loginusers)
      .subscribe((res) => {
        console.log(res);
        this.showSuccess();
      },
        (error) => {
          console.log(error);
          this.showError();
      });
  }
}
