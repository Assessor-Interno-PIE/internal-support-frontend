import { Component, ElementRef, inject, Input, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Department } from '../../../models/department';
import { DepartmentService } from '../../../services/department.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('container') container!: ElementRef;
  @Input() user: User = new User(0,'','','', new Department(0,'',[],[]),0);
  department: Department = new Department(0,'',[],[]);
  departments: Department[]=[];
  selectedUser?: User;

    // Campos de login
    //email: string = '';
    username: string = '';
    password: string = '';
  
    // Campos de registro
    name: string = '';
    //registerUsername: string = ''; = SERÁ user.username MESMO
    // registerPassword: string = ''; = SERÁ user.password MESMO
  //email: string = 'admin';
  //password: string = 'admin';

  renderer = inject(Renderer2);
  router = inject(Router);
  userService = inject(UserService);
  departmentService =inject(DepartmentService);
  constructor(){this.findDepartments();}


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
          text: "Houve um erro ao tentar buscar os departamentos!",
          icon: "error"
        });
      }
    });
  }
  

  toggleContainer(action: 'register' | 'login') { 
    // Verifica se o container está definido antes de acessar seu nativeElement
    if (this.container) {
      const containerElement = this.container.nativeElement;

      if (action === 'register') {
        this.renderer.addClass(containerElement, 'active');
        console.log("Classe 'active' adicionada para 'register'");
      } else if (action === 'login') {
        this.renderer.removeClass(containerElement, 'active');
        console.log("Classe 'active' removida para 'login'");
      }
    } else {
      console.error("Container não está definido.");
    }
  }

  onSubmitLogin() {
    // Lógica de login (com base no que foi configurado)
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['admin/dashboard']);
    } else {
      alert('Login inválido.');
    }
  }

  onSubmitRegister() {
    if (!this.user.name || !this.user.username || !this.user.password) {
      Swal.fire({
        title: 'Erro!',
        text: 'Por favor, preencha todos os campos obrigatórios!',
        icon: 'error',
      });
      return;
    }
  
    console.log('Registrando novo usuário ', this.user);
  
    this.userService.save(this.user).subscribe({
      next: () => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Usuário registrado com sucesso!',
          icon: 'success',
        });
        this.toggleContainer('login'); // Retorna para a tela de login após o registro
      },
      error: () => {
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro ao registrar o usuário!',
          icon: 'error',
        });
      }
    });
  }
  
  
}
