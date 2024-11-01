import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { SideBarComponent } from '../../../side-bar/side-bar.component';
import { DepartmentService } from '../../../../services/department.service';
import { Department } from '../../../../models/department';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [FormsModule, CommonModule, SideBarComponent],
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss'], 
})
export class DepartmentFormComponent {
  newDepartment: Department;

  router = inject(Router);
  departmentService = inject(DepartmentService); // Utilize um serviço específico para departamentos

  constructor() {
    this.newDepartment = new Department(0, '', [], []); // Criação de um novo departamento
  }

  save() {
    console.log('Dados enviados para salvar:', this.newDepartment);

    if (this.newDepartment.name.trim() === '') {
      alert('O nome do departamento deve ser válido.');
      return;
    }

    if (this.newDepartment.id === 0) {
      this.departmentService.save(this.newDepartment).subscribe({
        next: (response: string) => {
          console.log('Resposta do servidor:', response);
          Swal.fire({
            title: 'Perfeito!',
            text: 'Departamento cadastrado com sucesso!',
            icon: 'success',
          });
          this.router.navigate(['admin/departamentos']); 
        },
        error: (erro) => {
          console.error(erro);
          alert('Ocorreu algum erro ao cadastrar!');
        },
      });
    } else {
      this.departmentService.update(this.newDepartment).subscribe({
        next: (response: string) => {
          console.log('Resposta do servidor:', response);
          Swal.fire({
            title: 'Perfeito!',
            text: 'Departamento atualizado com sucesso!',
            icon: 'success',
          });
          this.router.navigate(['admin/departamentos']);
        },
        error: (erro) => {
          console.error(erro); 
          alert('Ocorreu algum erro ao atualizar!');
        },
      });
    }
  }
}
