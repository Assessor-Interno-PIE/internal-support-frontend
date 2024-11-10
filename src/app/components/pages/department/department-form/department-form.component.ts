import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { DepartmentService } from '../../../../services/department.service';
import { Department } from '../../../../models/department';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../models/user';
import { Document } from '../../../../models/document';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss'],
})
export class DepartmentFormComponent implements OnInit {
  @Input() department: Department = new Department(0, '', [], []);
  documents: Document[] = [];
  users: User[] = [];
  isEditMode: boolean = false;

  router = inject(Router);
  route = inject(ActivatedRoute);
  departmentService = inject(DepartmentService);

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.loadDepartment(Number(id));
    }
  }

  loadDepartment(id: number): void {
    this.departmentService.findById(id).subscribe({
      next: (department) => {
        this.department = department;
      },
      error: () => {
        Swal.fire({
          title: "Erro!",
          text: "Houve um erro ao tentar buscar o departamento pelo ID!",
          icon: "error"
        });
      }
    });
  }

  save(): void {
    if (this.isEditMode) {
      this.updateDepartment();
    } else {
      this.createDepartment();
    }
  }

  createDepartment(): void {
    this.departmentService.save(this.department).subscribe({
      next: () => {
        Swal.fire({
          title: 'Perfeito!',
          text: 'Departamento cadastrado com sucesso!',
          icon: 'success',
        });
        this.router.navigate(['admin/departamentos']);
      },
      error: () => {
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro ao cadastrar o departamento!',
          icon: 'error',
        });
      }
    });
  }

  updateDepartment(): void {
    this.departmentService.updateById(this.department.id, this.department).subscribe({
      next: () => {
        Swal.fire({
          title: 'Perfeito!',
          text: 'Departamento atualizado com sucesso!',
          icon: 'success',
        });
        this.router.navigate(['admin/departamentos']);
      },
      error: () => {
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro ao atualizar o departamento!',
          icon: 'error',
        });
      }
    });
  }

  closeForm(): void {
    this.router.navigate(['admin/departamentos']);
  }
}
