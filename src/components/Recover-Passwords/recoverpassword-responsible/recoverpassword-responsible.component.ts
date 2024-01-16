import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recoverpassword-responsible',
  templateUrl: './recoverpassword-responsible.component.html',
  styleUrls: ['./recoverpassword-responsible.component.css'],
})
export class RecoverpasswordResponsibleComponent {
  existingEmail: string = '';
  eyeIcon = faEye;
  eyeIconSlash = faEyeSlash;
  visible: boolean = true;
  changetype: boolean = true;

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

  viewpassword() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  showSuccess() {
    this.toastr.success('Password alterada com sucesso!', 'Sucesso', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  showError() {
    this.toastr.error('A Password não foi alterada!', 'Erro', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  sendRecoverPasswordResponsible(recoverPasswordResponsavel: {
    newPassword: string;
    confirmNewPassword: string;
  }) {
    console.log(recoverPasswordResponsavel);
    console.log(this.existingEmail);
    this.http
      .put(
        `http://localhost:3005/restaurantregistrations/${this.existingEmail}/updatepassword`,
        recoverPasswordResponsavel
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.showSuccess();
          this.router.navigate(['/Authentication/login-responsibles']);
        },
        (error) => {
          console.error('Erro ao efetuar a alteração de password: ', error);
          this.showError();
        }
      );
  }
}
