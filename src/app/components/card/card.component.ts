import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Document } from '../../models/document';
import { Category } from '../../models/category';
import { Department } from '../../models/department';
import { User } from '../../models/user';
import { Accesslevel } from '../../models/accesslevel';
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

  @Input() document: Document = new Document(
    0,                             // id
    '',                // title
    '',      // content
    new Department(0, '', [], []), // department
    new Category(0, '', []),     // category
    new Date().toISOString(),      // createdAt
    new Date().toISOString(),      // updatedAt
    new User(0, '', '', '',
      new Department(0, '', [], []),
      [],
      new Accesslevel(0, '', []))
  );

  documentService = inject(DocumentService);
  router = inject(Router);
  constructor() {
    this.findAll();
  }
  // Método para buscar todos os documentos
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

  toggleDetails(documentId: number): void {
    const document = this.documents.find(doc => doc.id === documentId);
    if (document) {
      document.showDetails = !document.showDetails;
    }
  }
}