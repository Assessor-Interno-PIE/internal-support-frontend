import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent{ 

  logout(): void {
    window.location.href = '/login';
    localStorage.removeItem('backgroundImage');
  }

  profileView(): void {
    window.location.href = 'admin/perfil';
  }
}