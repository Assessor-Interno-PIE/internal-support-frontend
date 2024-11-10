import { Component, inject, OnInit } from '@angular/core';
import { DocumentService } from '../../../../services/document.service';
import { Document } from '../../../../models/document';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../../search-bar/search-bar.component';
import { Department } from '../../../../models/department';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-documents-list',
  standalone: true,
  imports: [SearchBarComponent, CommonModule, FormsModule],
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss']
})
export class DocumentsListComponent {
  documents: Document[] = [];  // Lista completa de documentos
  document: Document = new Document(0, '', new Department(0, '', [], []), '', '');
  selectedDocument?: Document = this.document;

  documentService = inject(DocumentService);

  // Variáveis de Paginação
  paginatedDocuments: Document[] = [];  // Documentos exibidos na página atual
  currentPage: number = 1;  // Página atual
  itemsPerPage: number = 5;  // Itens por página
  totalPages: number = 1;  // Total de páginas

  constructor() {
    this.findAll();
  }

  sanitizer = inject(DomSanitizer);

  showModal: boolean = false;
  pdfUrl: SafeResourceUrl | null = null;
  //  pdfUrl: string = '';

  // Função para visualizar o PDF
  visualizarPdf(filePath: string) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(filePath);  // Sanitiza a URL para uso seguro
    this.showModal = true;
  }

  // Função para fechar o modal
  closeModal() {
    this.showModal = false;
    this.pdfUrl = null;
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
        this.documentService.delete(id).subscribe({
          next: () => {
            this.findAll();  // Recarrega a lista de documentos após a exclusão
            Swal.fire('Deletado!', 'Documento deletado com sucesso!', 'success');
          },
          error: () => {
            Swal.fire('Erro', 'Erro ao deletar o documento.', 'error');
          }
        });
      }
    });
  }


  // Função para rastrear os documentos pelo ID (necessário para *ngFor)
  trackById(index: number, document: Document): number {
    return document.id;
  }
}