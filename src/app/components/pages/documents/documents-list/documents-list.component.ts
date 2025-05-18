import { Component, inject, OnInit } from '@angular/core';
import { DocumentService } from '../../../../services/document.service';
import { Document } from '../../../../models/document';
import { Department } from '../../../../models/department';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationService } from '../../../../services/notification.service';
import { AuthService } from '../../../../auth/auth.service';
import { DepartmentService } from '../../../../services/department.service';

@Component({
  selector: 'app-documents-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss']
})
export class DocumentsListComponent implements OnInit {
 paginatedDocuments: Document[] = [];
  totalElements = 0;
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;

  departments: Department[] = []; // GUARDA OS DEPARTAMENTOS

  authService = inject(AuthService);
  documentService = inject(DocumentService);
  notificationService = inject(NotificationService);
  sanitizer = inject(DomSanitizer);
  departmentService = inject(DepartmentService);

  ngOnInit(): void {
    this.loadDepartmentsAndDocuments();
  }

  loadDepartmentsAndDocuments(): void {
    this.departmentService.findAll().subscribe({ // supondo que você tenha findAll() aqui
      next: (deps) => {
        this.departments = deps;
        this.loadPaginatedDocuments();
      },
      error: (err) => {
        this.notificationService.handleError('Erro ao carregar departamentos.');
        console.error(err);
      }
    });
  }

  getDepartmentNameById(id: string): string {
    const dept = this.departments.find(d => d.id === id);
    return dept ? dept.name : 'Desconhecido';
  }

  loadPaginatedDocuments(page = 0, size = this.itemsPerPage): void {
    this.documentService.findAllPaginated(page, size).subscribe({
      next: (response) => {
        this.paginatedDocuments = (response.content || []).map((doc: any) => ({
          id: doc.id,
          title: doc.title,
          description: doc.description,
          filePath: doc.filePath,
          addedBy: doc.addedBy,
          department: { name: this.getDepartmentNameById(doc.groupId) } // pega o nome certo aqui
        }));
        this.totalElements = response.totalElements || 0;
        this.currentPage = response.number + 1;
        this.totalPages = response.totalPages || 1;

        if (this.paginatedDocuments.length === 0 && this.currentPage > 1) {
          this.goToPage(this.currentPage - 1);
        }
      },
      error: (err) => {
        this.notificationService.handleError('Erro ao carregar documentos paginados.');
        console.error(err);
      }
    });
  }

  visualizarPdf(document: Document): void {
    if (document.filePath) {
      try {
        // Assume que filePath contém Base64 puro (sem prefixo "data:application/pdf;base64,")
        const base64Data = document.filePath;
        const binaryString = window.atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const fileUrl = URL.createObjectURL(blob);
        window.open(fileUrl, '_blank');
        URL.revokeObjectURL(fileUrl);
      } catch (error) {
        this.notificationService.handleError('Erro ao visualizar o arquivo PDF.');
        console.error('Erro ao decodificar Base64:', error);
      }
    } else {
      this.notificationService.handleError('Nenhum arquivo disponível para visualização.');
    }
  }

  downloadDocument(id: number): void {
    this.documentService.downloadDocument(id).subscribe({
      next: (response) => {
        const contentDisposition = response.headers.get('Content-Disposition');
        const fileName = contentDisposition
          ? contentDisposition.split('filename=')[1].replace(/"/g, '')
          : 'documento.pdf';
        const blob = response.body as Blob;
        const fileUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(fileUrl);
        this.notificationService.handleSuccess('Arquivo baixado com sucesso!');
      },
      error: () => {
        this.notificationService.handleError('Erro ao baixar o arquivo.');
      }
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadPaginatedDocuments(page - 1, this.itemsPerPage);
  }

  changePageSize(): void {
    this.currentPage = 1; // Reseta para a primeira página ao mudar o tamanho
    this.loadPaginatedDocuments(0, this.itemsPerPage);
  }

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
            this.loadPaginatedDocuments(this.currentPage - 1, this.itemsPerPage);
          },
          error: () => {
            this.notificationService.handleError('Erro ao deletar o documento.');
          }
        });
      }
    });
  }

  getPageNumbers(): number[] {
    const pages = [];
    const maxPagesToShow = 5; // Limite de botões de página exibidos
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  trackById(index: number, document: Document): number {
    return document.id;
  }
}