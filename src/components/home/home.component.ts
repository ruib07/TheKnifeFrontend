import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Contacto efetuado com sucesso!');
  }

  showError() {
    this.toastr.error('Contacto não foi efetuado!');
  }

  sendContact(contact: { name: string, email: string, phoneNumber: number, subject: string, message: string }) {
    console.log(contact);

    this.http.post('http://localhost:3005/contacts', contact)
      .subscribe((res: any) => {
        console.log(res);
        this.showSuccess();
      },
        (error) => {
          console.log(error);
          this.showError();
      })
  }

}
