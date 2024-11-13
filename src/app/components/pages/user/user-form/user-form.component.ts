import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../../models/user';
import { Department } from '../../../../models/department';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';
import { DepartmentService } from '../../../../services/department.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  @Input() user: User = new User(0,'','','', new Department(0,'',[],[]),0);
  users: User[] = [];
  departments: Department[] = [];
  department: Department;
  isEditMode: boolean = false;

  router = inject(Router);
  route = inject(ActivatedRoute);
  userService = inject(UserService);
  departmentService = inject(DepartmentService);

  constructor(){
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.findUserById(id);
    }

    this.department = new Department(0, '', [], []); 
    this.findDepartments();
  }


  

  selectDepartment(department: Department | null): void {
    if (department === null) {
      this.user.department = new Department(0, 'Selecione um Departamento', [], []); // Desmarcar
    } else {
      this.user.department = department; // Selecionar o departamento
    }
  }

  findDepartments(): void {
    this.departmentService.findAll().subscribe({
      next: (departments) => {
        this.departments = departments;
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

  findUserById(id:number): void {
    this.userService.findById(id).subscribe({
      next: (user) => {
        this.user = user;
        console.log('Sucesso', 'Usuários carregados com sucesso!', 'success');
      },
      error: () => {
        console.log(
          'Erro',
          'Não foi possível carregar os usuários.',
          'error'
        );
      },
      complete: () => console.log('Busca de usuários completa.'),
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
     // Verificar se o valor de 'isAdmin' está correto antes de enviar ao backend
     console.log('Criando usuário com isAdmin:', this.user.isAdmin);  // Adicionar log aqui

    this.userService.save(this.user).subscribe({
      next: () => {
        Swal.fire({
          title: 'Perfeito!',
          text: 'Usuário cadastrado com sucesso!',
          icon: 'success',
        });
        this.router.navigate(['admin/users']);
      },
      error: () => {
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro ao cadastrar o usuário!',
          icon: 'error',
        });
      }
    });
  }

  updateUser(): void {
   // Verificar se o valor de 'isAdmin' está correto antes de enviar ao backend
   console.log('Atualizando usuário com isAdmin:', this.user.isAdmin);  // Adicionar log aqui

    this.userService.updateById(this.user.id, this.user).subscribe({
      next: () => {
        Swal.fire({
          title: 'Perfeito!',
          text: 'Usuário atualizado com sucesso!',
          icon: 'success',
        });
        this.router.navigate(['admin/users']);
      },
      error: () => {
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro ao atualizar o usuário!',
          icon: 'error',
        });
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
