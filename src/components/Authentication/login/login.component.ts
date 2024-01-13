import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router, private el: ElementRef) { }

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
        this.setStyle('');
        this.router.navigate(['/Profiles/ClientProfile/client-editprofile']);
      } else {
        this.showError();
      }
  },
  (error) => {
    console.error('Erro ao efetuar login: ', error);
    this.setStyle('1px solid #D00000');
    this.showError();
  });
}

private setStyle(style: string) {
  const emailInput = this.el.nativeElement.querySelector('[name="email"]');
  const passwordInput =
    this.el.nativeElement.querySelector('[name="password"]');

  if (emailInput) {
    emailInput.style.border = style;
  }

  if (passwordInput) {
    passwordInput.style.border = style;
  }
}
}
