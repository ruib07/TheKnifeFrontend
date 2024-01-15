import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recoverpasswordemail-user',
  templateUrl: './recoverpasswordemail-user.component.html',
  styleUrls: ['./recoverpasswordemail-user.component.css']
})
export class RecoverpasswordemailUserComponent {

  existingEmail: string = '';  // Initialize the property

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  showSuccess() {
    this.toastr.success('Email confirmado com sucesso!');
  }

  showError() {
    this.toastr.error('O Email não existe!');
  }

  getRecoverPasswordemailUser() {
    console.log(this.existingEmail);

    const url = 'http://localhost:3005/registerusers/confirm-email/' + this.existingEmail;

    this.http.get(url)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.message) {
            this.showSuccess();
            this.router.navigate(['/Recover-Passwords/recoverpassword-user'], { queryParams: { email: this.existingEmail } });
          } else {
            this.showError();
          }
        },
        (error) => {
          console.error(error);
          this.showError();
        }
      );
  }
}