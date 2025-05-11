import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Decoder } from '../../decoder/decoder';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  decoder = new Decoder();
  usuario = {
    nome: '',
    foto: 'https://media-gru2-2.cdn.whatsapp.net/v/t61.24694-24/436491333_983772643752473_9036282596056724518_n.jpg?ccb=11-4&oh=01_Q5AaIDPs-ohN_J0vvDT1V8FKf_aAVU2CBaAQoEZuvVF9tTLL&oe=6738A9B3&_nc_sid=5e03e0&_nc_cat=111',
  };

  authService = inject(AuthService);

  currentRoute: string = '';

  constructor(private router: Router) {
    // Monitora mudanças de rota e atualiza `currentRoute` sempre que a navegação é concluída
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });

    this.getUser();
  }

  getUser() {
    const storedValue: string | null = localStorage.getItem('token');
    
    if (storedValue === null) {
        throw new Error("Token not found in localStorage");
    }

    const user = this.decoder.decodeJwt(storedValue);

    if (user) {
        this.usuario.nome = user.username;
    } else {
        throw new Error("Invalid token structure");
    }
}

  ngOnInit(): void {}
}
