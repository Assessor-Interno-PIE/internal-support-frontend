import { Component, inject } from '@angular/core';
import { User } from '../../../../models/user';
import { Department } from '../../../../models/department';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
users: User[] = [];
user: User = new User(0,'','','', new Department(0,'',[],[]),0);
selectedUser?: User;

isUsersPopupOpen = false;
isDepartmentPopupOpen = false;

userService = inject(UserService);
notificationService = inject(NotificationService);


 // Variáveis de Paginação
 totalElements: number = 0;
 paginatedUsers: User[] = [];  // Usuários exibidos na página atual
 currentPage: number = 1;  // Página atual
 itemsPerPage: number = 5;  // Itens por página
 totalPages: number = 1;  // Total de páginas

constructor(){
this.loadPaginatedUsers();
}

// findAll(): void {
//   this.userService.findAll().subscribe({
//     next: (lista) => {
//       this.users = lista;
//       this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
//       this.updatePage(); // Atualiza a lista paginada
//       console.log('Usuários carregados com sucesso!');
//     },
//     error: () => {
//       console.log('Erro ao carregar usuários.');
//     },
//   });
// }



loadPaginatedUsers(page: number = 0, size: number = 5): void {
  this.userService.findAllPaginated(page, size).subscribe({
    next: (response) => {
      this.paginatedUsers = response.content || [];
      this.totalElements = response.totalElements || 0;
      this.currentPage = response.number + 1;
      this.totalPages = response.totalPages || 1;

      if (this.paginatedUsers.length === 0 && this.currentPage > 1) {
        this.goToPage(this.currentPage - 1);
      }
    },
    error: (err) => {
      console.log('Erro ao carregar docmentos paginados:', err);
    },
  });
}



// Função para navegar entre as páginas
goToPage(page: number) {
  if (page < 1 || page > this.totalPages) return;
  this.currentPage = page;
  this.loadPaginatedUsers(page - 1, this.itemsPerPage); // Atualiza a lista para a nova página
}

// Função para alterar o número de itens por página
changePageSize() {
  this.loadPaginatedUsers(0, this.itemsPerPage); // Volta para a primeira página após alterar a quantidade de itens por página
}

deletar(id: number): void {
  Swal.fire({
    title: 'Tem certeza?',
    text: 'Esta ação não poderá ser desfeita.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ec7324',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sim, deletar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.userService.deleteById(id).subscribe({
        next: () => {
          this.notificationService.handleSuccess('Usuário deletado com sucesso!');
          this.users = this.users.filter(user => user.id !== id);
          this.updateListUsers()
        },
        error: () => {
          this.notificationService.handleError('Erro ao deletar o usuário.');
        },
      });
    }
  });
}

  // Função para att a lista de documentos após a exclusão
  private updateListUsers(): void {
    this.userService.findAllPaginated(this.currentPage - 1, this.itemsPerPage).subscribe({
      next: (response) => {
        if (response.content.length === 0 && this.currentPage > 1) {
          this.currentPage -= 1;
        }
        this.loadPaginatedUsers(this.currentPage - 1, this.itemsPerPage);
      },
      error: () => {
        Swal.fire('Erro!', 'Erro ao carregar dados após exclusão.', 'error');
      },
    });
  }

// Função para rastrear os usuários pelo ID (necessário para *ngFor)
trackById(index: number, user: User): number {
  return user.id;
}


}
