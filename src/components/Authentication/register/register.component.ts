import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  showSuccess() {
    this.toastr.success('Registo efetuado com sucesso!');
  }

  showError() {
    this.toastr.error('O registo não foi efetuado!');
  }

  RegisterUsers(registerusers: { username: string, email: string, password: string }) {
    console.log(registerusers);

    this.http.post('http://localhost:3005/registerusers', registerusers)
      .subscribe((res: any) => {
        console.log(res);

        const userDataForUsersTable = {
          username: registerusers.username,
          email: registerusers.email,
          password: registerusers.password,
          image: null,
          registeruser_id: res.id
        };

        this.http.post('http://localhost:3005/auths/usersignup', userDataForUsersTable)
          .subscribe((userRes) => {
            console.log("Registered user: " + userRes);
            this.showSuccess();
            this.router.navigate(['/Authentication/login/']);
          });
      },
        (error) => {
          console.error(error);
          this.showError();
      });
  }
}
