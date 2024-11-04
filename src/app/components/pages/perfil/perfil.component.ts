import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  usuario = {
    nome: 'João Graciotim',
    email: 'joaograciotim.profissional@gmail.com',
    biografia: 'Desenvolvedor de software com interesse em Angular e tecnologias web.',
    foto: 'https://media-gru2-2.cdn.whatsapp.net/v/t61.24694-24/462754661_1200543907838871_2817234739903803578_n.jpg?ccb=11-4&oh=01_Q5AaIEc1JBUK4c5Dz8inVY9BS6JWaouKG07ch2cQSraK5DJ_&oe=67336AB3&_nc_sid=5e03e0&_nc_cat=100',
    departamento: 'Desenvolvimento',
  };
}
