import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('container') container!: ElementRef;

  email: string = 'admin';
  password: string = 'admin';

  constructor(private renderer: Renderer2, private router: Router) {}

  toggleContainer(action: 'register' | 'login') {
    // Verifica se o container está definido antes de acessar seu nativeElement
    if (this.container) {
      const containerElement = this.container.nativeElement;

      if (action === 'register') {
        this.renderer.addClass(containerElement, 'active');
        console.log("Classe 'active' adicionada para 'register'");
      } else if (action === 'login') {
        this.renderer.removeClass(containerElement, 'active');
        console.log("Classe 'active' removida para 'login'");
      }
    } else {
      console.error("Container não está definido.");
    }
  }

  onSubmit() {
    if (this.email === 'admin' && this.password === 'admin') {
      this.router.navigate(['admin/dashboard']);
    } else {
      alert('Login inválido.');
    }
  }
}
