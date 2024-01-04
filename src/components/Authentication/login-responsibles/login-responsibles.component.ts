import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-responsibles',
  templateUrl: './login-responsibles.component.html',
  styleUrls: ['./login-responsibles.component.css']
})
export class LoginResponsiblesComponent {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Login Efetuado com sucesso!');
  }

  showError() {
    this.toastr.error('Login não foi efetuado!');
  }

  sendLoginResponsible(loginResponsible: { email: string, password: string }) {
  this.http.post('http://localhost:3005/auths/responsiblesignin', loginResponsible, { observe: 'response' })
    .subscribe((res: any) => {
      console.log(res);
      const token = res.body.token;
      if (token) {
        localStorage.setItem('token', token);
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
