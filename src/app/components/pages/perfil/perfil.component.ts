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
    foto: 'https://avatars.githubusercontent.com/u/115734698?v=4'
  };
}
