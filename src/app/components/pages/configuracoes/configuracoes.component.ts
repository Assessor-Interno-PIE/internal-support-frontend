import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Decoder } from '../../../decoder/decoder';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

    togglePasswordForm() {
    this.showPasswordForm = !this.showPasswordForm;
  }

  decoder = new Decoder();
  showPasswordForm: boolean = false;
  newPassword: string = '';
  http = inject(HttpClient);
  userService = inject(UserService);
  updatePassword() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Token não encontrado. Faça login novamente.');
      return;
    }

    const user = this.decoder.decodeJwt(token);
    if (!user || !user.id) {
      alert('Usuário inválido. Faça login novamente.');
      return;
    }

    if (this.newPassword.trim() === '') {
      alert('Digite a nova senha.');
      return;
    }

    const userId = +user.id;
    this.userService.updatePassword(userId, this.newPassword).subscribe({
      next: () => {
        alert('Senha alterada com sucesso!');
        this.showPasswordForm = false;
        this.newPassword = '';
      },
      error: (err) => {
        console.error('Erro ao atualizar senha:', err);
        if (err.status === 0) {
          alert('Erro de conexão: Verifique o servidor.');
        } else {
          alert(`Erro ${err.status}: ${err.message}`);
        }
      }
    });
  }

    
}