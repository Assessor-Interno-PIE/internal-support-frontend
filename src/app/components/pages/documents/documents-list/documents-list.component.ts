import { Component, inject, Input, OnInit } from '@angular/core';
import { DocumentService } from '../../../../services/document.service';
import { Document } from '../../../../models/document';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../../search-bar/search-bar.component';
import { Department } from '../../../../models/department';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-documents-list',
  standalone: true,
  imports: [SearchBarComponent, CommonModule, FormsModule],
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss']
})
export class DocumentsListComponent {
  documents: Document[] = [];  // Lista completa de documentos
  @Input() document: Document = new Document(0, '', new Department(0, '', [], []), '', '');
  selectedDocument?: Document = this.document;

  documentService = inject(DocumentService);
  notificationService = inject(NotificationService);

  // Variáveis de Paginação
  paginatedDocuments: Document[] = [];  // Documentos exibidos na página atual
  currentPage: number = 1;  // Página atual
  itemsPerPage: number = 5;  // Itens por página
  totalPages: number = 1;  // Total de páginas

  constructor() {
    this.findAll();
  }

  sanitizer = inject(DomSanitizer);

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


  // Carregar todos os documentos
findAll(): void {
  this.documentService.findAll().subscribe({
    next: (lista) => {
      this.documents = lista.sort((a, b) => b.id - a.id);  // Ordena por ID decrescente
      this.totalPages = Math.ceil(this.documents.length / this.itemsPerPage);
      this.updatePage(); // Atualiza a lista paginada ao carregar os dados
      console.log('Documentos carregados com sucesso!');
    },
    error: () => {
      console.log('Erro ao carregar documentos.');
    },
  });
}


  // Atualiza a lista de documentos paginada com base na página atual
  updatePage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedDocuments = this.documents.slice(start, end);
  }

  // Função para navegar entre as páginas
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePage();  // Atualiza a lista para a nova página
  }

  // Função para alterar o número de itens por página
  changePageSize() {
    this.totalPages = Math.ceil(this.documents.length / this.itemsPerPage);
    this.goToPage(1);  // Volta para a primeira página após alterar a quantidade de itens por página
  }


  // Função para deletar o documento com confirmação de exclusão
  deletar(id: number): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não poderá ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ec7324', // Cor do botão de confirmação
      cancelButtonColor: '#3085d6',  // Cor do botão de cancelamento
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteDocument(id);
      }
    });
  }

  private deleteDocument(id: number): void {
    this.documentService.delete(id).subscribe({
      next: () => {
        this.notificationService.handleSuccess('Documento deletado com sucesso!');
        this.documents = this.documents.filter(document => document.id !== id);
        this.updatePage();
        
        if (this.paginatedDocuments.length === 0 && this.currentPage > 1) {
          this.currentPage--;
          this.updatePage();
        }
      },
      error: () => {
        this.notificationService.handleError('Erro ao deletar o documento.');
      }
    });
  }


  // Função para rastrear os documentos pelo ID (necessário para *ngFor)
  trackById(index: number, document: Document): number {
    return document.id;
  }
}