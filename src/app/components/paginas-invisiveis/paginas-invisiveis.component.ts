import { Component,ElementRef, Renderer2, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginas-invisiveis',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './paginas-invisiveis.component.html',
  styleUrls: ['./paginas-invisiveis.component.scss']
})
export class PAGINASINVISIVEISComponent {

  @ViewChild('container') container!: ElementRef;

  constructor(private renderer: Renderer2) {}

  toggleContainer(action: 'register' | 'login') {
    if (action === 'register') {
      this.renderer.addClass(this.container.nativeElement, 'active');
      console.log("Classe 'active' adicionada para 'register'");
    } else {
      this.renderer.removeClass(this.container.nativeElement, 'active');
      console.log("Classe 'active' removida para 'login'");
    }
  }


  email: string = 'admin@example.com'; // Definindo um valor padrão
  password: string = 'admin'; // Definindo um valor padrão

  router = inject(Router);

  onSubmit() {
    if (this.email === 'admin' && this.password === 'admin') {
      this.router.navigate(['admin/dashboard']);
    } else {
      alert('Login inválido.');
    }
  }
}
