import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { DocumentService } from '../../../../services/document.service';
import { Department } from '../../../../models/department';
import { Document } from '../../../../models/document';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../../../services/department.service';
import { lastValueFrom } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-documents-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './documents-form.component.html',
  styleUrls: ['./documents-form.component.scss'],
})
export class DocumentsFormComponent {
  document: Document = new Document(0, '', new Department(0, '', [], []), '', '');
  documents: Document[] = [];
  departments: Department[] = [];
  department: Department = new Department(0, '', [], []);
  selectedFile!: File;

  router = inject(Router);
  documentService = inject(DocumentService);
  departmentService = inject(DepartmentService);
  route = inject(ActivatedRoute);

  constructor() {
    this.loadDepartments();

    // Verificar se há um ID no parâmetro da rota para modo de edição
    const docId = this.route.snapshot.paramMap.get('id');
    if (docId) {
      this.loadDocumentForEdit(+docId);
    }
  }

  async loadDocumentForEdit(id: number): Promise<void> {
    try {
      const doc = await this.documentService.findById(id).toPromise();
      if (doc) {
        this.document = doc;
        this.document.department = doc.department; // Vincula o objeto do departamento
        console.log('Documento carregado para edição:', this.document);
      }
    } catch (error) {
      console.error('Erro ao carregar o documento para edição:', error);
    }
  }


  async loadDepartments(): Promise<void> {
    try {
      const depts = await lastValueFrom(this.departmentService.findAll());
      this.departments = depts || [];
      //console.log('Departamentos carregados:', this.departments);
    } catch (error) {
      console.error('Erro ao carregar departamentos:', error);
    }
  }

  async save(): Promise<void> {
    if (!this.selectedFile && !this.document.id) {
      console.error("Todos os campos são obrigatórios.");
      return;
    }

    try {
      if (this.document.id) {
        // Atualização do documento existente
        await firstValueFrom(this.documentService.updateDocument(this.document.id, this.selectedFile, this.document));
        Swal.fire('Sucesso!', 'Documento atualizado com sucesso!', 'success');
      } else {
        // Criação de novo documento
        await firstValueFrom(this.documentService.saveDocument(this.selectedFile, this.document.department, this.document.title, this.document.description));
        Swal.fire('Sucesso!', 'Documento adicionado com sucesso!', 'success');
      }

      // Aguardar a confirmação do usuário antes de redirecionar
      Swal.fire({
        title: 'Operação concluída!',
        text: 'Você será redirecionado...',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500 // Aguarda 1.5 segundos antes de redirecionar
      }).then(() => {
        this.router.navigate(['admin/documentos']);
      });
    } catch (error) {
      console.error('Erro ao salvar o documento:', error);
    }
  }



  selectDepartment(department: Department | null): void {
    if (department === null) {
      this.document.department = new Department(0, 'Selecione um Departamento', [], []); // Desmarcar
    } else {
      this.document.department = department; // Selecionar o departamento
    }
  }
  


  fileSelected = false;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileSelected = true; 
    } else {
      this.fileSelected = false; 
    }
  }
  


  closeForm(): void {
    this.router.navigate(['admin/documentos']);
  }
}
