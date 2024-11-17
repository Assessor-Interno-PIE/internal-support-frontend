import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocumentService } from '../../../../services/document.service';
import { Department } from '../../../../models/department';
import { Document } from '../../../../models/document';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../../../services/department.service';
import { lastValueFrom } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../../services/notification.service';

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
  notificationService = inject(NotificationService);

  constructor() {
    this.loadDepartments();
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
        this.document.department = doc.department;
        console.log('Documento carregado para edição:', this.document);
      }
    } catch (error) {
      this.notificationService.handleError('Erro ao carregar o documento para edição.');
    }
  }

  async loadDepartments(): Promise<void> {
    try {
      const depts = await lastValueFrom(this.departmentService.findAll());
      this.departments = depts || [];
    } catch (error) {
      this.notificationService.handleError('Erro ao carregar departamentos.');
    }
  }

  async save(): Promise<void> {
    if (!this.document.title || !this.document.description || !this.document.department.id || !this.selectedFile) {
      this.notificationService.handleError('Todos os campos obrigatórios devem ser preenchidos!');
      return;
    }

    try {
      if (this.document.id) {
        await firstValueFrom(this.documentService.updateDocument(this.document.id, this.selectedFile, this.document));
        this.notificationService.handleSuccess('Documento atualizado com sucesso!');
      } else {
        await firstValueFrom(this.documentService.saveDocument(this.selectedFile, this.document.department, this.document.title, this.document.description));
        this.notificationService.handleSuccess('Documento adicionado com sucesso!');
      }

      this.router.navigate(['admin/documentos']);
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 400) {
        const validationErrors = error.error;
        this.showValidationErrors(validationErrors);
      } else {
        console.error('Erro ao salvar o documento:', error);
      }
    }
  }

  showValidationErrors(errors: { [key: string]: string }): void {
    let errorMessages = Object.values(errors).join(', ');
    this.notificationService.handleError(errorMessages);
  }

  selectDepartment(department: Department | null): void {
    if (department === null) {
      this.document.department = new Department(0, 'Selecione um Departamento', [], []);
    } else {
      this.document.department = department;
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
