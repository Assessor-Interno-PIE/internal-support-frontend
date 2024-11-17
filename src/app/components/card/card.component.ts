import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Document } from '../../models/document';
import { Department } from '../../models/department';
import { User } from '../../models/user';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  documents: Document[] = [];

  @Input() document: Document = new Document(0,'',new Department(0,'',[],[]),'','');

  documentService = inject(DocumentService);
  router = inject(Router);
  constructor() {
    this.findAll();
  }

  findAll(): void {
    this.documentService.findAll().subscribe({
      next: (lista) => {
        this.documents = lista;
        console.log('Sucesso', 'Documentos carregados com sucesso!', 'success');
      },
      error: () => {
        console.log(
          'Erro',
          'Não foi possível carregar os documentos.',
          'error'
        );
      },
      complete: () => console.log('Busca de documentos completa.'),
    });
  }

  
  initializeDocuments(data: Document[]): Document[] {
    return data.map(doc => ({ ...doc, showDetails: false })); 
  }

  /*
  toggleDetails(documentId: number): void {
    const document = this.documents.find(doc => doc.id === documentId);
    if (document) {
      document.showDetails = !document.showDetails;
    }
  }*/





    visualizarPdf(id: number) {
      this.documentService.viewDocument(id).subscribe({
          next: (blob) => {
              const fileUrl = URL.createObjectURL(blob);
              window.open(fileUrl, '_blank'); // Abre o PDF em uma nova aba
          },
          error: () => {
              console.log('Erro', 'Erro ao carregar o arquivo.', 'error');
          }
      });
  
  }
}