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
    this.http.post('http://localhost:3005/auths/usersignin', loginusers, { observe: 'response' })
      .subscribe((res: any) => {
        const usertoken = res.body.usertoken;
      if (usertoken) {
        localStorage.setItem('usertoken', usertoken);
        this.showSuccess();
      } else {
        this.showError();
      }
  },
  (error) => {
    console.error('Erro ao efetuar login: ', error);
    this.showError();
  });
}
}
