import { Component, inject } from '@angular/core';
import { DepartmentService } from '../../../../services/department.service';
import { Department } from '../../../../models/department';
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
  isUsersPopupOpen = false;
  isDocumentsPopupOpen = false;

  departmentService = inject(DepartmentService);

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

  // Função para deletar o departamento
  deletar(id: number): void {
    this.departmentService.deleteById(id).subscribe({
      next: () => {
        this.findAll();  // Recarrega a lista de departamentos após a exclusão
        Swal.fire('Sucesso', 'Departamento deletado com sucesso!', 'success');
      },
      error: () => {
        Swal.fire('Erro', 'Erro ao deletar o departamento.', 'error');
      },
    });
  }

  // Função para rastrear os departamentos pelo ID (necessário para *ngFor)
  trackById(index: number, department: Department): number {
    return department.id;
  }

}
