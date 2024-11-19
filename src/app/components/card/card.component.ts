import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Document } from '../../models/document';
import { Department } from '../../models/department';
import { DocumentService } from '../../services/document.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('toggleDetails', [
      state('false', style({
        height: '0',
        opacity: 0,
        padding: '0 20px',
        display: 'none',
      })),
      state('true', style({
        height: '*',
        opacity: 1,
        padding: '10px 20px',
        display: 'block',
      })),
      transition('false <=> true', [
        animate('300ms ease-out')
      ])
    ])
  ]
})

export class CardComponent {
  documents: Document[] = [];

  @Input() document: Document = new Document(0, '', new Department(0, '', [], []), '', '');

  documentService = inject(DocumentService);
  router = inject(Router);

  constructor() {
    this.findAll();
  }

  // Método para alternar o estado de detalhes do documento
  toggleDetails(documentId: number): void {
    this.documents = this.documents.map(doc =>
      doc.id === documentId ? { ...doc, showDetails: !doc.showDetails } : doc
    );
  }

  findAll(): void {
    this.documentService.findAll().subscribe({
      next: (lista) => {
        this.documents = this.initializeDocuments(lista); // Inicializando o valor showDetails
        console.log('Sucesso', 'Documentos carregados com sucesso!', 'success');
      },
      error: () => {
        console.log('Erro', 'Não foi possível carregar os documentos.', 'error');
      },
      complete: () => console.log('Busca de documentos completa.'),
    });
  }

  // Método para inicializar os documentos com showDetails falso
  initializeDocuments(data: Document[]): Document[] {
    return data.map(doc => ({ ...doc, showDetails: false }));
  }

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
