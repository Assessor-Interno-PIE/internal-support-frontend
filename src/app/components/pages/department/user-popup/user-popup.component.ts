import { Component, Input } from '@angular/core';
import { User } from '../../../../models/user';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-user-popup',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './user-popup.component.html',
  styleUrl: './user-popup.component.scss'
})
export class UserPopupComponent {
  @Input() users: User[] = []; // Lista de usuários recebida como entrada

  constructor(private dialogRef: MatDialogRef<UserPopupComponent>) {}

  // Método para fechar o pop-up
  closePopup() {
    this.dialogRef.close(); // Fechar o pop-up
  }
}