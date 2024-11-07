import { Component, Input } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-document-popup',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './document-popup.component.html',
  styleUrl: './document-popup.component.scss'
})
export class DocumentPopupComponent {
  @Input() documents: Document[] = []; // Lista de documentos recebida como entrada

  constructor(private dialogRef: MatDialogRef<DocumentPopupComponent>) {}

  // Método para fechar o pop-up
  closePopup() {
    this.dialogRef.close(); // Fechar o pop-up
  }
}