import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../../../../services/department.service';
import { Department } from '../../../../models/department';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss'],
})
export class DepartmentFormComponent implements OnInit {
  @Input() department: Department = new Department(0, '', [], []);
  isEditMode: boolean = false;

  router = inject(Router);
  route = inject(ActivatedRoute);
  departmentService = inject(DepartmentService);
  notificationService = inject(NotificationService);

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
      error: () => this.notificationService.handleError("Houve um erro ao tentar buscar o departamento pelo ID!"),
    });
  }

  save(): void {
    if (this.department.name.trim() === '') {
      this.notificationService.handleError('Por favor, insira o nome do departamento!');
      return;
    }

    if (this.isEditMode) {
      this.updateDepartment();
    } else {
      this.createDepartment();
    }
  }

  createDepartment(): void {
    this.departmentService.save(this.department).subscribe({
      next: () => {
        this.notificationService.handleSuccess('Departamento cadastrado com sucesso!');
        this.router.navigate(['admin/departamentos']);
      },
      error: () => this.notificationService.handleError('Ocorreu um erro ao cadastrar o departamento!'),
    });
  }

  updateDepartment(): void {
    this.departmentService.updateById(this.department.id, this.department).subscribe({
      next: () => {
        this.notificationService.handleSuccess('Departamento atualizado com sucesso!');
        this.router.navigate(['admin/departamentos']);
      },
      error: () => this.notificationService.handleError('Ocorreu um erro ao atualizar o departamento!'),
    });
  }

  closeForm(): void {
    this.router.navigate(['admin/departamentos']);
  }
}
