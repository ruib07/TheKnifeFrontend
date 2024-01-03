import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recoverpasswordemail-user',
  templateUrl: './recoverpasswordemail-user.component.html',
  styleUrls: ['./recoverpasswordemail-user.component.css']
})
export class RecoverpasswordemailUserComponent {
  userEmail: string = '';
  emailExists: boolean | undefined; // Variável para armazenar se o email existe na base de dados

  constructor(private http: HttpClient) {}

  async checkEmailValidity(): Promise<void> {
    if (this.userEmail) {
      try {
        const response = await this.http.get<any>(`http://localhost:3005/registerusers?email=${this.userEmail}`).toPromise();

        if (response && response.exists !== undefined) {
          this.emailExists = response.exists;

          if (this.emailExists) {
            console.log('Email existe na base de dados');

          } else {
            console.log('Email não existe na base de dados');

          }
        } else {
          console.log('Resposta inválida do servidor');

        }
      } catch (error) {
        console.error('Erro ao verificar o email:', error);
        // Tratar erro
      }
    } else {
      console.log('Email inválido');

    }
  }
}
