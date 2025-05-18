import { Component, inject } from '@angular/core';
import { DepartmentService } from '../../../../services/department.service';
import { DocumentService } from '../../../../services/document.service';
import { UserService } from '../../../../services/user.service';
import { Department } from '../../../../models/department';
import { Document } from '../../../../models/document';
import { User } from '../../../../models/user';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { DepartmentStatsDTO } from '../../../../models/DTO/department-stats-dto';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
})
export class DepartmentListComponent {
  // Variáveis de dados
  department: Department = new Department('', '', [], []);
  departmentStatsDTO: DepartmentStatsDTO = new DepartmentStatsDTO(0, 0);
  selectedDepartment?: Department;
  relatedDocuments: Document[] = [];
  relatedUsers: User[] = [];
  isUsersPopupOpen = false;
  isDocumentsPopupOpen = false;

  // Serviços injetados
  departmentService = inject(DepartmentService);
  documentService = inject(DocumentService);
  userService = inject(UserService);
  notificationService = inject(NotificationService);

  // Paginação
  paginatedDepartments: {
    content: Department[];
    number: number;
    totalPages: number;
    totalElements: number;
    size: number;
  } = {
    content: [],
    number: 0,
    totalPages: 0,
    totalElements: 0,
    size: 5,
  };

  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor() {
    this.loadPaginatedDepartments();
  }

  loadPaginatedDepartments(page: number = 0, size: number = 5): void {
    this.departmentService.findAllPaginated(page, size).subscribe({
      next: (response) => {
        this.paginatedDepartments = response;
        this.currentPage = response.number + 1;

        if (this.paginatedDepartments.content.length === 0 && this.currentPage > 1) {
          this.goToPage(this.currentPage - 1);
        }
      },
      error: (err) => {
        console.error('Erro ao carregar departamentos paginados:', err);
      },
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.paginatedDepartments.totalPages) return;
    this.currentPage = page;
    this.loadPaginatedDepartments(page - 1, this.itemsPerPage);
  }

  changePageSize(): void {
    this.loadPaginatedDepartments(0, this.itemsPerPage);
  }

  deletar(id: string): void {
  Swal.fire({
    title: 'Você tem certeza?',
    text: 'Esta ação não poderá ser desfeita!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ec7324',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sim, deletar!',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      this.documentService.findDocumentsByDepartment(id).subscribe((documents: Document[]) => {
        this.relatedDocuments = documents;

        this.userService.findUsersByDepartment(id).subscribe((users: User[]) => {
          this.relatedUsers = users;

          if (documents.length > 0 || users.length > 0) {
            const htmlContent = `
              <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <h3 style="color: #d9534f;">Não é possível deletar o departamento!</h3>
                <p>Este departamento possui relações ativas com <strong>documentos</strong> ou <strong>usuários</strong>.</p>
                <div style="margin-top: 20px;">
                  <h4 style="color: #5bc0de;">Documentos Relacionados:</h4>
                  <ul style="list-style-type: none; padding-left: 0;">
                    ${documents.map((doc) =>
                      `<li style="background-color: #f9f9f9; padding: 5px; margin: 5px 0; border-radius: 5px; border: 1px solid #ddd;">${doc.title}</li>`).join('')}
                  </ul>
                </div>
                <div style="margin-top: 20px;">
                  <h4 style="color: #5bc0de;">Usuários Relacionados:</h4>
                  <ul style="list-style-type: none; padding-left: 0;">
                    ${users.map((user) =>
                      `<li style="background-color: #f9f9f9; padding: 5px; margin: 5px 0; border-radius: 5px; border: 1px solid #ddd;">${user.name}</li>`).join('')}
                  </ul>
                </div>
                <p style="margin-top: 15px;">Após remover essas relações, você poderá excluir o departamento com segurança.</p>
              </div>
            `;
            Swal.fire({
              icon: 'info',
              title: 'Aviso',
              html: htmlContent,
              showCancelButton: false,
              confirmButtonColor: '#ec7324',
              confirmButtonText: 'OK',
            });
          } else {
            this.departmentService.deleteById(id).subscribe({
              next: () => {
                this.notificationService.handleSuccess('Departamento deletado com sucesso!');
                this.updateListDepartments();
              },
              error: () => {
                this.notificationService.handleError('Erro ao deletar o departamento.');
              },
            });
          }
        });
      });
    }
  });
}

trackById(index: number, department: Department): string {
  return department.id;
}

  private updateListDepartments(): void {
    this.departmentService.findAllPaginated(this.currentPage - 1, this.itemsPerPage).subscribe({
      next: (response) => {
        if (response.content.length === 0 && this.currentPage > 1) {
          this.currentPage -= 1;
        }
        this.loadPaginatedDepartments(this.currentPage - 1, this.itemsPerPage);
      },
      error: () => {
        Swal.fire('Erro!', 'Erro ao carregar dados após exclusão.', 'error');
      },
    });
  }
}
