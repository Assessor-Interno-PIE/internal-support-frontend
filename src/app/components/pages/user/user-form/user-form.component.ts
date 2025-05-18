import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../../models/user';
import { Department } from '../../../../models/department';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { DepartmentService } from '../../../../services/department.service';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  @Input() user: User = new User(0, '', '', '', new Department('', '', [], []), 0);
  users: User[] = [];
  departments: Department[] = [];
  department: Department;
  isEditMode: boolean = false;

  router = inject(Router);
  route = inject(ActivatedRoute);
  userService = inject(UserService);
  departmentService = inject(DepartmentService);
  notificationService = inject(NotificationService);

  constructor() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.findUserById(id);
    }

    this.department = new Department('', '', [], []); 
    this.findDepartments();
  }

  selectDepartment(department: Department | null): void {
    if (department === null) {
      this.user.department = new Department('0', 'Selecione um Departamento', [], []);
    } else {
      this.user.department = department;
    }
  }

  findDepartments(): void {
    this.departmentService.findAll().subscribe({
      next: (departments) => {
        this.departments = departments;
      },
      error: () => {
        this.notificationService.handleError("Houve um erro ao tentar buscar os departamentos!");
      }
    });
  }

  findUserById(id: number): void {
    this.userService.findById(id).subscribe({
      next: (user) => {
        this.user = user;
        this.notificationService.handleSuccess('Usuário carregado com sucesso!');
      },
      error: () => {
        this.notificationService.handleError('Não foi possível carregar o usuário.');
      },
      complete: () => console.log('Busca de usuário completa.'),
    });
  }

  save(): void {
    if (this.isEditMode) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  createUser(): void {
    console.log('Criando usuário com isAdmin:', this.user.isAdmin);

    this.userService.save(this.user).subscribe({
      next: () => {
        this.notificationService.handleSuccess('Usuário cadastrado com sucesso!');
        this.router.navigate(['admin/users']);
      },
      error: () => {
        this.notificationService.handleError('Ocorreu um erro ao cadastrar o usuário!');
      }
    });
  }

  updateUser(): void {
    const userUpdatePayload = {
      id: this.user.id,
      name: this.user.name,
      username: this.user.username,
      password: this.user.password,
      department: this.user.department,
      isAdmin: this.user.isAdmin
    };
  
    console.log("Payload para update:", userUpdatePayload);
  
    this.userService.updateById(this.user.id, userUpdatePayload).subscribe({
      next: () => {
        this.notificationService.handleSuccess('Usuário atualizado com sucesso!');
        this.router.navigate(['admin/users']);
      },
      error: (error) => {
        console.error('Erro ao atualizar usuário:', error);
        this.notificationService.handleError('Ocorreu um erro ao atualizar o usuário!');
      }
    });
  }

  closeForm(): void {
    this.router.navigate(['admin/users']);
  }

  selectAccessLevel(level: number): void {
    this.user.isAdmin = level;
  }
}
