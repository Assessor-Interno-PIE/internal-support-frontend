import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Document } from '../../models/document';
import { Department } from '../../models/department';
import { DocumentService } from '../../services/document.service';
import { Decoder } from '../../decoder/decoder';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  documents: Document[] = [];
  visibleCards: number = 8; // Número inicial de cards visíveis
  decoder = new Decoder;

  @Input() document: Document = new Document(0, '', new Department(0, '', [], []), '', '');

  documentService = inject(DocumentService);
  router = inject(Router);

  constructor() {
    this.findAll();
  }

  toggleDetails(documentId: number): void {
    this.documents = this.documents.map(doc =>
      doc.id === documentId ? { ...doc, showDetails: !doc.showDetails } : doc
    );
  }

  getDepartmentId(): number {
      const storedValue: string | null = localStorage.getItem('token');
      
      // Verifique se storedValue é nulo antes de continuar
      if (storedValue === null) {
          throw new Error("Token not found in localStorage");
      }
  
      const user = this.decoder.decodeJwt(storedValue);
  
      // Verifique se user.department e user.department.id existem
      if (user && user.department && typeof user.department.id === 'number') {
          return user.department.id;
      } else {
          throw new Error("Invalid token structure");
      }
  }

  findAll(): void {
    this.documentService.findDocumentsByDepartment(this.getDepartmentId()).subscribe({
      next: (lista) => {
        this.documents = this.initializeDocuments(lista);
        console.log('Sucesso', 'Documentos carregados com sucesso!', 'success');
      },
      error: () => {
        console.log('Erro', 'Não foi possível carregar os documentos.', 'error');
      },
      complete: () => console.log('Busca de documentos completa.'),
    });
  }


  initializeDocuments(data: Document[]): Document[] {
    return data.map(doc => ({ ...doc, showDetails: false }));
  }

  visualizarPdf(id: number) {
    this.documentService.viewDocument(id).subscribe({
      next: (blob) => {
        const fileUrl = URL.createObjectURL(blob);
        window.open(fileUrl, '_blank');
      },
      error: () => {
        console.log('Erro', 'Erro ao carregar o arquivo.', 'error');
      }
    });
  }


}