import { Component, ElementRef, inject, Input, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Department } from '../../../models/department';
import { DepartmentService } from '../../../services/department.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
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
  authService = inject(AuthService);

  // JWT Login teste
  loginService = inject(LoginService);
  // JWT Login teste
  
  constructor(){
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

  // JWT Login teste
  userLogin(){
    this.loginService.loginUser(this.login).subscribe({
      next: token => {

      },
      error: error => {}
    });
  }
  // JWT Login teste

  onSubmitLogin() {
    if (!this.username || !this.password) {
      Swal.fire({
        title: 'Erro!',
        text: 'Por favor, preencha todos os campos obrigatórios!',
        icon: 'error',
      });
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (user) => {
        // Se o login for bem-sucedido, redireciona para a dashboard
        Swal.fire({
          title: 'Bem-vindo!',
          text: 'Login bem-sucedido!',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['admin/dashboard']);  // ou para qualquer outra página de sua escolha
        });
      },
      error: () => {
        // Se o login falhar, exibe uma mensagem de erro
        Swal.fire({
          title: 'Erro!',
          text: 'Usuário ou senha inválidos!',
          icon: 'error',
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
