import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = 'admin'; // Definindo um valor padrão
  password: string = 'admin'; // Definindo um valor padrão

  router = inject(Router);

  constructor(){
  }

  onSubmit() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['admin/dashboard']);
    } else {
      alert('Login inválido.');
    }
  }
}
