import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recoverpassword-user',
  templateUrl: './recoverpassword-user.component.html',
  styleUrls: ['./recoverpassword-user.component.css'],
})
export class RecoverpasswordUserComponent implements OnInit {
  existingEmail: string = '';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.existingEmail = params['email'];
      console.log(this.existingEmail);
    });
  }

  showSuccess() {
    this.toastr.success('Password alterada com sucesso!');
  }

  showError() {
    this.toastr.error('A Password não foi alterada!');
  }

  sendRecoverPasswordUser(recoverPasswordUser: {
    newPassword: string;
    confirmNewPassword: string;
  }) {
    console.log(recoverPasswordUser);
    console.log(this.existingEmail);
    this.http
      .put(
        `http://localhost:3005/registerusers/${this.existingEmail}/updatepassword`,
        recoverPasswordUser
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.showSuccess();
          this.router.navigate(['/Authentication/login']);
        },
        (error) => {
          console.error('Erro ao efetuar a alteração de password: ', error);
          this.showError();
        }
      );
  }
}
