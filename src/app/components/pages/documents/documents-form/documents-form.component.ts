import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { SideBarComponent } from '../../../side-bar/side-bar.component';
import { DocumentService } from '../../../../services/document.service';
import { Department } from '../../../../models/department';
import { Category } from '../../../../models/category';
import { User } from '../../../../models/user';
import { Accesslevel } from '../../../../models/accesslevel';
import { Document } from '../../../../models/document';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents-form',
  standalone: true,
  imports: [FormsModule, CommonModule, SideBarComponent],
  templateUrl: './documents-form.component.html',
  styleUrl: './documents-form.component.scss',
})
export class DocumentsFormComponent {
  documents: Document[] = [];
  newDocument: Document;

  router = inject(Router);
  documentService = inject(DocumentService);
  constructor() {
    // instâncias vazias de Department, Category e User
    const department = new Department(0, '', [], []);
    const category = new Category(0, '', []);
    const userDepartment = new Department(0, '', [], []); 
    const user = new User(
      0,
      '',
      '',
      '',
      userDepartment,
      [],
      new Accesslevel(0, '', [])
    );

    // Passando as instâncias para o novo documento
    this.newDocument = new Document(
      0,
      '',
      '',
      department,
      category,
      new Date().toISOString(),
      new Date().toISOString(),
      user
    );

    this.findAll();
  }

  // Método para buscar todos os documentos
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
    console.log('Dados enviados para salvar:', this.newDocument);
    if (this.newDocument.department.id === 0) {
      alert('O departamento associado deve ser válido.');
      return;
  }
    if (this.newDocument.id == 0) {
      this.documentService.save(this.newDocument).subscribe({
        next: (response: string) => {
          //this.findAll();
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
    } else {
      this.documentService.update(this.newDocument).subscribe({
        next: (response: string) => {
          console.log('Resposta do servidor:', response);
          Swal.fire({
            title: 'Perfeito!',
            text: 'Documento atualizado com sucesso!',
            icon: 'success',
          });
          this.router.navigate(['admin/documentos']);
        },
        error: (erro) => {
          alert('Ocorreu algum erro ao atualizar!');
        },
      });
    }
  }
}
