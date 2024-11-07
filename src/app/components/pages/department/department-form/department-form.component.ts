// import { CommonModule } from '@angular/common';
// import { Component, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import Swal from 'sweetalert2';
// import { DepartmentService } from '../../../../services/department.service';
// import { Department } from '../../../../models/department';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-department-form',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   templateUrl: './department-form.component.html',
//   styleUrls: ['./department-form.component.scss'], 
// })
// export class DepartmentFormComponent {
//   newDepartment: Department;

//   router = inject(Router);
//   departmentService = inject(DepartmentService); // Utilize um serviço específico para departamentos

//   constructor() {
//     this.newDepartment = new Department(0, '', [], []); // Criação de um novo departamento
//   }

//   save() {
//     console.log('Dados enviados para salvar:', this.newDepartment);

//     if (this.newDepartment.name.trim() === '') {
//       alert('O nome do departamento deve ser válido.');
//       return;
//     }

//     if (this.newDepartment.id === 0) {
//       this.departmentService.save(this.newDepartment).subscribe({
//         next: (response: string) => {
//           console.log('Resposta do servidor:', response);
//           Swal.fire({
//             title: 'Perfeito!',
//             text: 'Departamento cadastrado com sucesso!',
//             icon: 'success',
//           });
//           this.router.navigate(['admin/departamentos']); 
//         },
//         error: (erro) => {
//           console.error(erro);
//           alert('Ocorreu algum erro ao cadastrar!');
//         },
//       });
//     } else {
//       this.departmentService.update(this.newDepartment).subscribe({
//         next: (response: string) => {
//           console.log('Resposta do servidor:', response);
//           Swal.fire({
//             title: 'Perfeito!',
//             text: 'Departamento atualizado com sucesso!',
//             icon: 'success',
//           });
//           this.router.navigate(['admin/departamentos']);
//         },
//         error: (erro) => {
//           console.error(erro); 
//           alert('Ocorreu algum erro ao atualizar!');
//         },
//       });
//     }
//   }
// }



import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { DepartmentService } from '../../../../services/department.service';
import { Department } from '../../../../models/department';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../models/user';
import { DocumentService } from '../../../../services/document.service';
import { UserService } from '../../../../services/user.service';
import { Document } from '../../../../models/document';


@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss'], 
})
export class DepartmentFormComponent {
  @Input() department: Department = new Department(
    0,'',[],[]
  );
  documents: Document[] = [];
  users: User[] = [];

  isEditMode: boolean = false;
  id!: number;
  router = inject(Router);
  rotaAtivada = inject(ActivatedRoute);
  departmentService = inject(DepartmentService); // Utilize um serviço específico para departamentos

  constructor() {
    this.id = this.rotaAtivada.snapshot.params['id'];
    if (this.id > 0) {
      this.findById(this.id);
      this.isEditMode = true;
      this.department.id = Number(this.id);
    }
    
   // this.findUsers();
   // this.findDocuments();
   }

   findById(id: number) {
    this.departmentService.findById(id).subscribe({
      next: departmentId => {
        this.department = departmentId;
      },
      error: err => {
        Swal.fire({
          title: "Erro!",
          text: "Houve um erro ao tentar procurar pelo ID!",
          icon: "error"
        });
      }
    });
  }

  save() {
    console.log('Dados enviados para salvar:', this.department);

    // fazer verificao patern do nome model no front e nao no TS
    if (this.department.id === 0) {
      this.departmentService.save(this.department).subscribe({
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
      this.departmentService.update(this.department.id, this.department).subscribe({
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


  closeForm() {
    this.router.navigate(['admin/departamentos']);
  }
}