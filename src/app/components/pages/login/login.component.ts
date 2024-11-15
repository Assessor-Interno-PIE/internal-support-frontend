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
import { LoginService } from '../../../auth/login.service';

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

  // JWT Login teste
  loginService = inject(LoginService);
  // JWT Login teste
  
  constructor(){
    // this.findDepartments(); removi pra ele parar de chamar isso toda hr
    this.loginService.removeToken();
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
    this.loginService.loginUser(this.login).subscribe({
      next: (token) => {
        if (token) {
          console.log(token);
          this.loginService.addToken(token);
          this.router.navigate(['admin/dashboard']);
        } else {
          Swal.fire({
            title: 'Erro!',
            text: 'Usuário ou senha incorretos.',
            icon: 'error'
          });
        }
      },
      error: (error) => {
        console.error('Erro ao fazer login:', error);
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro ao fazer login. Por favor, tente novamente.',
          icon: 'error'
        });
      }
    });
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
        this.toggleContainer('login');
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
