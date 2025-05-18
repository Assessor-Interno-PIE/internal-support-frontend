import { Component, inject, Input, OnInit } from '@angular/core';
import { DocumentService } from '../../../../services/document.service';
import { Document } from '../../../../models/document';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Department } from '../../../../models/department';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationService } from '../../../../services/notification.service';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-documents-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss']
})
export class DocumentsListComponent {
  documents: Document[] = [];  // Lista completa de documentos
  @Input() document: Document = new Document(0, '', new Department('', '', [], []), '', '');
  selectedDocument?: Document = this.document;

  authService = inject(AuthService);

  documentService = inject(DocumentService);
  notificationService = inject(NotificationService);

  totalElements: number = 0;
  paginatedDocuments: Document[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor() {
    this.loadPaginatedDocuments();
  }

  sanitizer = inject(DomSanitizer);

  loadPaginatedDocuments(page: number = 0, size: number = 5): void {
    this.documentService.findAllPaginated(page, size).subscribe({
      next: (response) => {
        this.paginatedDocuments = response.content || [];
        this.totalElements = response.totalElements || 0;
        this.currentPage = response.number + 1;
        this.totalPages = response.totalPages || 1;

        if (this.paginatedDocuments.length === 0 && this.currentPage > 1) {
          this.goToPage(this.currentPage - 1);
        }
      },
      error: (err) => {
        console.log('Erro ao carregar docmentos paginados:', err);
      },
    });
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
  downloadDocument(id: number): void {
    this.documentService.downloadDocument(id).subscribe({
      next: (response) => {
        // O backend já envia o arquivo com o tipo de conteúdo correto
        const contentDisposition = response.headers.get('Content-Disposition');
        const fileName = contentDisposition ? contentDisposition.split('filename=')[1].replace(/"/g, '') : 'documento.pdf';
        // Cria o Blob a partir da resposta
        const blob = response.body as Blob;
        const fileUrl = window.URL.createObjectURL(blob);
        // Cria um link para o download
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        link.click();
        // Libera a URL temporária
        window.URL.revokeObjectURL(fileUrl);
        console.log('Sucesso', 'Sucesso em baixar o arquivo!', 'success');
      },
      error: () => {
        console.log('Erro', 'Deu erro em baixar o arquivo!', 'error');
      }
    });
  }

  // Função para navegar entre as páginas
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadPaginatedDocuments(page - 1, this.itemsPerPage);
  }

  changePageSize() {
    this.loadPaginatedDocuments(0, this.itemsPerPage);
  }


  // Função para deletar o documento com confirmação de exclusão
  deletar(id: number): void {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta ação não poderá ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ec7324',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentService.delete(id).subscribe({
          next: () => {
            this.notificationService.handleSuccess('Documento deletado com sucesso!');
            this.documents = this.documents.filter(document => document.id !== id);
            this.updateListDocuments();
          },
          error: () => {
            this.notificationService.handleError('Erro ao deletar o decumento.');
          },
        });
      }
    });
  }

  // Função para att a lista de documentos após a exclusão
  private updateListDocuments(): void {
    this.documentService.findAllPaginated(this.currentPage - 1, this.itemsPerPage).subscribe({
      next: (response) => {
        if (response.content.length === 0 && this.currentPage > 1) {
          this.currentPage -= 1;
        }
        this.loadPaginatedDocuments(this.currentPage - 1, this.itemsPerPage);
      },
      error: () => {
        Swal.fire('Erro!', 'Erro ao carregar dados após exclusão.', 'error');
      },
    });
  }

  // Função para rastrear os documentos pelo ID (necessário para *ngFor)
  trackById(index: number, document: Document): number {
    return document.id;
  }
}


  // findAll(): void {
  //   this.documentService.findAll().subscribe({
  //     next: (lista) => {
  //       this.documents = lista.sort((a, b) => b.id - a.id);  // Ordena por ID decrescente
  //       this.totalPages = Math.ceil(this.documents.length / this.itemsPerPage);
  //       this.updatePage(); // Atualiza a lista paginada ao carregar os dados
  //       console.log('Documentos carregados com sucesso!');
  //     },
  //     error: () => {
  //       console.log('Erro ao carregar documentos.');
  //     },
  //   });
  // }