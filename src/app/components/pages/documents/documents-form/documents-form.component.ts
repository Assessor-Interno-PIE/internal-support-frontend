import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { DocumentService } from '../../../../services/document.service';
import { Department } from '../../../../models/department';
import { User } from '../../../../models/user';
import { Document } from '../../../../models/document';
import { Router } from '@angular/router';
import { Category } from '../../../../../../internal-support-frontend/src/app/models/category';

@Component({
  selector: 'app-documents-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './documents-form.component.html',
  styleUrls: ['./documents-form.component.scss'],
})
export class DocumentsFormComponent {
  documents: Document[] = [];
  document: Document;
  departments: Department[] = [];

  router = inject(Router);
  documentService = inject(DocumentService);
  
  constructor() {
    // instâncias vazias de Department, Category e User
    const department = new Department(0, '', [], []); 
    const category = new Category(0, '', []); 
    const userDepartment = new Department(0, '', [], []); 
    const user = new User(0,'','','',new Department(0,'',[],[]),0);

    // Passando as instâncias para o novo documento
    this.document = new Document(0,'',new Department(0,'',[],[]),'','');

    this.findAll();
  }

  findAll(): void {
    this.documentService.findAll().subscribe({
      next: (lista) => {
        this.documents = lista;
        console.log('Sucesso', 'Documentos carregados com sucesso!', 'success');
      },
      error: () => {
        console.log(
          'Erro',
          'Não foi possível carregar os documentos.',
          'error'
        );
      },
      complete: () => console.log('Busca de documentos completa.'),
    });
  }

  save() {
    console.log('Dados enviados para salvar:', this.document);
    if (this.document.department.id === 0) {
      alert('O departamento associado deve ser válido.');
      return;
    }
      // Atribua valores aos parâmetros necessários
      const file = this.selectedFile;  // Supondo que você tenha uma propriedade `selectedFile` no componente
      const department = this.document.department;
      const title = this.document.title;
      const description = this.document.description;

      this.documentService.saveDocument(file, department, title, description).subscribe({
        next: (response: string) => {
          console.log('Resposta do servidor:', response);
          Swal.fire({
            title: 'Perfeito!',
            text: 'Documento Cadastrado com sucesso!',
            icon: 'success',
          });
          this.router.navigate(['admin/documentos']);
        },
        error: (erro) => {
          alert('Ocorreu algum erro ao cadastrar!');
        },
      });
  }

  selectedFile!: File;

  onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
  }
}


  closeForm() {
    // Redirecionar ou fechar o formulário
    this.router.navigate(['admin/documentos']); // exemplo de redirecionamento
  }
}
