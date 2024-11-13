import { Component, inject } from '@angular/core';
import { DepartmentService } from '../../../../services/department.service';
import { DocumentService } from '../../../../services/document.service';
import { UserService } from '../../../../services/user.service';
import { Department } from '../../../../models/department';
import { Document } from '../../../../models/document';
import { User } from '../../../../models/user';
import Swal from 'sweetalert2';
import { SearchBarComponent } from '../../../search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { DepartmentStatsDTO } from '../../../../models/DTO/department-stats-dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [SearchBarComponent, CommonModule, FormsModule],
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
})
export class DepartmentListComponent {
  departments: Department[] = [];  // Lista completa de departamentos
  department: Department = new Department(0, '', [], []);
  departmentStatsDTO: DepartmentStatsDTO = new DepartmentStatsDTO(0, 0);
  selectedDepartment?: Department;
  relatedDocuments: Document[] = [];
  relatedUsers: User[] = [];  
  isUsersPopupOpen = false;
  isDocumentsPopupOpen = false;

  departmentService = inject(DepartmentService);
  documentService = inject(DocumentService);
  userService = inject(UserService);

  // Variáveis de Paginação
  paginatedDepartments: Department[] = [];  // Departamentos exibidos na página atual
  currentPage: number = 1;  // Página atual
  itemsPerPage: number = 5;  // Itens por página
  totalPages: number = 1;  // Total de páginas

  constructor() {
    this.findAll();
  }

  // Carregar todos os departamentos
  findAll(): void {
    this.departmentService.findAll().subscribe({
      next: (lista) => {
        this.departments = lista;
        this.totalPages = Math.ceil(this.departments.length / this.itemsPerPage);
        this.updatePage(); // Atualiza a lista paginada ao carregar os dados
        console.log('Departamentos carregados com sucesso!');
      },
      error: () => {
        console.log('Erro ao carregar departamentos.');
      },
    });
  }

  // Atualiza a lista de departamentos paginada com base na página atual
  updatePage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedDepartments = this.departments.slice(start, end);
  }

  // Função para navegar entre as páginas
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePage();  // Atualiza a lista para a nova página
  }

  // Função para alterar o número de itens por página
  changePageSize() {
    this.totalPages = Math.ceil(this.departments.length / this.itemsPerPage);
    this.goToPage(1);  // Volta para a primeira página após alterar a quantidade de itens por página
  }

  deletar(id: number): void {
    this.documentService.findDocumentsByDepartment(id).subscribe((documents: Document[]) => {
      this.relatedDocuments = documents;
      console.log('Documentos relacionados:', documents);

      this.userService.findUsersByDepartment(id).subscribe((users: User[]) => {
        this.relatedUsers = users;
        console.log('Usuários relacionados:', users);

        if (documents.length > 0 || users.length > 0) {
          const htmlContent = `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
              <h3 style="color: #d9534f;">Não é possível deletar o departamento!</h3>
              <p>Este departamento possui relações ativas com <strong>documentos</strong> e <strong>usuários</strong>.</p>
              <p>Por favor, remova ou associe os documentos e usuários a outros departamentos antes de excluir este departamento.</p>
              
              <div style="margin-top: 20px;">
                <h4 style="color: #5bc0de;">Documentos Relacionados:</h4>
                <ul style="list-style-type: none; padding-left: 0;">
                  ${documents
              .map(
                (doc) =>
                  `<li style="background-color: #f9f9f9; padding: 5px; margin: 5px 0; border-radius: 5px; border: 1px solid #ddd;">${doc.title}</li>`
              )
              .join('')}
                </ul>
              </div>

              <div style="margin-top: 20px;">
                <h4 style="color: #5bc0de;">Usuários Relacionados:</h4>
                <ul style="list-style-type: none; padding-left: 0;">
                  ${users
              .map(
                (user) =>
                  `<li style="background-color: #f9f9f9; padding: 5px; margin: 5px 0; border-radius: 5px; border: 1px solid #ddd;">${user.name}</li>`
              )
              .join('')}
                </ul>
              </div>

              <p style="margin-top: 20px;">Após remover essas relações, você poderá excluir o departamento com segurança.</p>
            </div>
          `;
  
          Swal.fire({
              icon: 'info',
              title: 'Aviso',
              html: htmlContent,
              showCancelButton: false,
              confirmButtonText: 'OK'
          });
      } else {
        this.departmentService.deleteById(id).subscribe({
          next: () => {
            Swal.fire('Sucesso', 'Departamento deletado com sucesso!', 'success');
            this.departments = this.departments.filter(department => department.id !== id);
            this.updatePage();
            if (this.paginatedDepartments.length === 0 && this.currentPage > 1) {
              this.currentPage--;
              this.updatePage();
            }
            console.log('Departamento excluído com sucesso!');
          },
          error: () => {
            Swal.fire('Erro', 'Erro ao deletar o departamento.', 'error');
          }
        });
      }
      });
    });
  }
  
  


  // Função para rastrear os departamentos pelo ID (necessário para *ngFor)
  trackById(index: number, department: Department): number {
    return department.id;
  }

}
