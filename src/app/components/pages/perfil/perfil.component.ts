import { Component } from '@angular/core';
import { Decoder } from '../../../decoder/decoder';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  decoder = new Decoder();

  usuario = {
    nome: '',
    email: '',
    username: '',
    biografia: 'Designer',
    foto: 'https://media-gru2-2.cdn.whatsapp.net/v/t61.24694-24/436491333_983772643752473_9036282596056724518_n.jpg?ccb=11-4&oh=01_Q5AaIDPs-ohN_J0vvDT1V8FKf_aAVU2CBaAQoEZuvVF9tTLL&oe=6738A9B3&_nc_sid=5e03e0&_nc_cat=111',
    departamento: '',
  };

  constructor() {
    this.getUser();
  }

  getUser() {
    const storedValue: string | null = localStorage.getItem('token');
    
    if (storedValue === null) {
        throw new Error("Token not found in localStorage");
    }

    const user = this.decoder.decodeJwt(storedValue);

    if (user) {
        this.usuario.nome = user.name;
        this.usuario.username = user.username;
        this.usuario.departamento = user.department.name
    } else {
        throw new Error("Invalid token structure");
    }
  }
}
