import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Decoder } from '../../../decoder/decoder';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent{ 

  notificationService = inject(NotificationService);

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
      this.notificationService.handleAlert('Alerta', 'Token não encontrado! Faça o login novamente.', 'warning');
      return;
    }

    const user = this.decoder.decodeJwt(token);
    if (!user || !user.id) {
      this.notificationService.handleAlert('Alerta', 'Usuário inválido. Faça login novamente.', 'warning');
      return;
    }

    if (this.newPassword.trim() === '') {
      this.notificationService.handleAlert('Alerta', 'Digite a nova senha.', 'warning');
      return;
    }

    const userId = +user.id;
    this.userService.updatePassword(userId, this.newPassword).subscribe({
      next: () => {
        this.notificationService.handleSuccess('Senha alterada com sucesso!');
        this.showPasswordForm = false;
        this.newPassword = '';
      },
      error: (err) => {
        console.error('Erro ao atualizar senha:', err);
        if (err.status === 0) {
          this.notificationService.handleError('Erro de conexão: Verifique o servidor.');
        } else {
          this.notificationService.handleError(`Erro ${err.status}: ${err.message}`);
        }
      }
    });
  }

    
}