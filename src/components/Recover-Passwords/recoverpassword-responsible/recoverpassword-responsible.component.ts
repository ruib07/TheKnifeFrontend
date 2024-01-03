import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recoverpassword-responsible',
  templateUrl: './recoverpassword-responsible.component.html',
  styleUrls: ['./recoverpassword-responsible.component.css']
})
export class RecoverpasswordResponsibleComponent {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Password alterada com sucesso!');
  }

  showError() {
    this.toastr.error('A Password não foi alterada!');
  }

  sendRecoverPasswordResponsible(recoverPasswordResponsible: {
    newPassword: string, confirmNewPassword: string,
  }) {
    console.log(recoverPasswordResponsible);
    this.http.put('/restaurantregistrations/:id/updatepassword', recoverPasswordResponsible)
      .subscribe((res) => {
        console.log(res);
        this.showSuccess();
      },
        (error) => {
          console.error('Erro ao efetuar a alteração de password: ', error);
          this.showError();
      })
  }

}
