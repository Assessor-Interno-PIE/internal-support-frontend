import { Component, inject } from '@angular/core';
import { DepartmentService } from '../../../../services/department.service';
import { Department } from '../../../../models/department';
import Swal from 'sweetalert2';
import { SearchBarComponent } from '../../../search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { DepartmentStatsDTO } from '../../../../models/DTO/department-stats-dto';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [SearchBarComponent, CommonModule],
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
})
export class DepartmentListComponent {
  departments: Department[] = [];
  department: Department = new Department(0,'',[],[]);
  departmentStatsDTO: DepartmentStatsDTO = new DepartmentStatsDTO(0,0);
  selectedDepartment?: Department;
  isUsersPopupOpen = false;
  isDocumentsPopupOpen = false;

  departmentService = inject(DepartmentService);

  constructor() {
    this.findAll();
  }

  findAll(): void {
    this.departmentService.findAll().subscribe({
      next: (lista) => {
        this.departments = lista;
        console.log('Departamentos carregados com sucesso!');
      },
      error: () => {
        console.log('Erro ao carregar departamentos.');
      },
    });
  }

  openUserPopup(department: Department): void {
    this.selectedDepartment = department;
    this.isUsersPopupOpen = true;
  }

  openDocumentPopup(department: Department): void {
    this.selectedDepartment = department;
    this.isDocumentsPopupOpen = true;
  }

  closePopup(): void {
    this.isUsersPopupOpen = false;
    this.isDocumentsPopupOpen = false;
  }

  deletar(id: number): void {
    this.departmentService.deleteById(id).subscribe({
      next: () => {
        this.findAll();
        Swal.fire('Sucesso', 'Departamento deletado com sucesso!', 'success');
      },
      error: () => {
        Swal.fire('Erro', 'Erro ao deletar o departamento.', 'error');
      },
    });
  }

  trackById(index: number, department: Department): number {
    return department.id;
  }
}
