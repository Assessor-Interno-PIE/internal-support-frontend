import { Component } from '@angular/core';
import { SideBarComponent } from '../../side-bar/side-bar.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [SideBarComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  usuario = {
    nome: 'João Silva',
    email: 'joao.silva@example.com',
    biografia: 'Desenvolvedor de software com interesse em Angular e tecnologias web.',
    foto: 'https://via.placeholder.com/100'
  };
}
