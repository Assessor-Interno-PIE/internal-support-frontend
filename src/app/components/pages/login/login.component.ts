import { Component, ElementRef, inject, Input, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Department } from '../../../models/department';
import { DepartmentService } from '../../../services/department.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Login } from '../../../auth/login';
import { AuthService } from '../../../auth/auth.service';
import { Registration } from '../../../auth/registration';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  login: Login = new Login();

  @ViewChild('container') container!: ElementRef;
  @Input() user: User = new User(0,'','','', new Department(0,'',[],[]),0);
  department: Department = new Department(0,'',[],[]);
  departments: Department[]=[];
  selectedUser?: User;
    username: string = '';
    password: string = '';
    name: string = '';

  renderer = inject(Renderer2);
  router = inject(Router);
  userService = inject(UserService);
  departmentService =inject(DepartmentService);

  userRegister: Registration = new Registration();

  // JWT Login teste
  authService = inject(AuthService);
  // JWT Login teste
  
  constructor(){
    this.findDepartments();
    this.authService.removeToken();
  }


  selectDepartment(department: Department): void {
    this.userRegister.department = department;
  }
  findDepartments() {
    this.departmentService.findAll().subscribe(departments => {
      this.departments = departments;
      console.log(this.departments);
    });
  }
  

  toggleContainer(action: 'register' | 'login') { 
    if (this.container) {
      const containerElement = this.container.nativeElement;

      if (action === 'register') {
        this.findDepartments();
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
    this.authService.loginUser(this.login).subscribe({
      next: (token) => {
        if (token) {
          this.authService.addToken(token);
          this.router.navigate(['admin/dashboard']);
        } else {
          Swal.fire('Erro!', 'Usuário ou senha incorretos.', 'error');
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          Swal.fire('Erro!', 'Credenciais incorretas. Por favor, verifique seu usuário e senha.', 'error');
        } else {
          const errorMessage = error.error?.message || error.error || 'Ocorreu um erro ao fazer login.';
          Swal.fire('Erro!', errorMessage, 'error');
        }
      }
    });
  }
  

  onSubmitRegister() {
    if (!this.userRegister.name || !this.userRegister.username || !this.userRegister.password) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    console.log('Registrando novo usuário ', this.userRegister);

    this.authService.registerUser(this.userRegister).subscribe({
      next: (token) => {
        console.log('Usuário registrado com sucesso', token);
        this.authService.addToken(token);
        alert('Usuário registrado com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao registrar o usuário:', error);
        alert('Ocorreu um erro ao registrar o usuário!');
      }
    });
  }
  
}
