import { Component, inject } from '@angular/core';
import { DocumentService } from '../../../../services/document.service';
import { Department } from '../../../../models/department';
import { Category } from '../../../../models/category';
import { User } from '../../../../models/user';
import { Accesslevel } from '../../../../models/accesslevel';
import { Document } from '../../../../models/document';
import Swal from 'sweetalert2';
import { SideBarComponent } from '../../../side-bar/side-bar.component';
import { SearchBarComponent } from '../../../search-bar/search-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documents-list',
  standalone: true,
  imports: [SideBarComponent, SearchBarComponent, CommonModule],
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.scss'
})
export class DocumentsListComponent {
  documents: Document[] = [];
  newDocument: Document;

  documentService = inject(DocumentService);

  constructor() {
     // instâncias vazias de Department, Category e User
     const department = new Department(0, '', [], []); 
     const category = new Category(0, '', []);
     const userDepartment = new Department(0, '', [], []); // Crie um departamento para o usuário
     const user = new User(0, '', '', '', userDepartment, [], new Accesslevel(0,'',[]));
 
     // Passando as instâncias para o novo documento
     this.newDocument = new Document(0, '', '', department, category, new Date().toISOString(), new Date().toISOString(), user);
     
    this.findAll();
  }

  // Método para buscar todos os documentos
  findAll(): void {
    this.documentService.findAll().subscribe({
      next: lista => {
        this.documents = lista;
        console.log('Sucesso', 'Documentos carregados com sucesso!', 'success');
      },
      error: () => {
        console.log('Erro', 'Não foi possível carregar os documentos.', 'error');
      },
      complete: () => console.log('Busca de documentos completa.')
    });
  }

   // Método para deletar um documento pelo ID
deletar(id:number): void {
  this.documentService.delete(this.newDocument).subscribe({
    next: () => {
      this.findAll();
      Swal.fire('Sucesso', 'Documento deletado com sucesso!', 'success');
    },
    error: () => {
      Swal.fire('Erro', 'Erro ao deletar o documento. Tente novamente.', 'error');
    },
    complete: () => console.log('Exclusão de documento completa.')
  });
}

}
