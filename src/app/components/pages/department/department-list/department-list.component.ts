import { Component, inject } from '@angular/core';
import { DepartmentService } from '../../../../services/department.service'; // Certifique-se de que o serviço de departamento existe
import { Department } from '../../../../models/department';
import Swal from 'sweetalert2';
import { SearchBarComponent } from '../../../search-bar/search-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [SearchBarComponent, CommonModule],
  templateUrl: './department-list.component.html', // Mude para o HTML correspondente
  styleUrls: ['./department-list.component.scss'], // Corrija para styleUrls
})
export class DepartmentListComponent {
  departments: Department[] = []; // Lista de departamentos
  newDepartment: Department; // Novo departamento para operações de edição

  departmentService = inject(DepartmentService); // Injete o serviço de departamento

  constructor() {
    // Instância vazia de Department
    this.newDepartment = new Department(0, '', [], []);
    this.findAll(); // Carregue todos os departamentos
  }

  // Método para buscar todos os departamentos
  findAll(): void {
    this.departmentService.findAll().subscribe({
      next: (lista) => {
        this.departments = lista;
        console.log('Sucesso', 'Departamentos carregados com sucesso!', 'success');
      },
      error: () => {
        console.log('Erro', 'Não foi possível carregar os departamentos.', 'error');
      },
      complete: () => console.log('Busca de departamentos completa.'),
    });
  }

  // Método para deletar um departamento pelo ID
  deletar(id: number): void {
    this.departmentService.delete(this.newDepartment).subscribe({
      next: () => {
        this.findAll(); // Atualize a lista após a exclusão
        Swal.fire('Sucesso', 'Departamento deletado com sucesso!', 'success');
      },
      error: () => {
        Swal.fire('Erro', 'Erro ao deletar o departamento. Tente novamente.', 'error');
      },
      complete: () => console.log('Exclusão de departamento completa.'),
    });
  }
}
