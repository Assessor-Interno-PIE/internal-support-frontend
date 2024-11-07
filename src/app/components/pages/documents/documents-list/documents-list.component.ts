import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../../../services/document.service';
import { Document } from '../../../../models/document';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../../search-bar/search-bar.component';

@Component({
  selector: 'app-documents-list',
  standalone: true,
  imports: [SearchBarComponent, CommonModule],
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss']
})
export class DocumentsListComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.documentService.findAll().subscribe({
      next: (data: Document[]) => this.documents = this.initializeDocuments(data),
      error: this.handleError('Erro ao carregar documentos')
    });
  }

  initializeDocuments(data: Document[]): Document[] {
    return data.map(doc => ({ ...doc, showDetails: false }));
  }

  toggleDetails(documentId: number): void {
    const document = this.documents.find(doc => doc.id === documentId);
    if (document) {
      document.showDetails = !document.showDetails;
    }
  }

  deletar(documentId: number): void {
    this.documentService.delete({ id: documentId } as Document).subscribe({
      next: () => {
        this.documents = this.documents.filter(doc => doc.id !== documentId);
        Swal.fire('Deletado!', 'O documento foi deletado com sucesso.', 'success');
      },
      error: this.handleError('Erro ao deletar documento')
    });
  }

  private handleError(message: string) {
    return (error: any) => {
      console.error(message, error);
      Swal.fire('Erro!', message, 'error');
    };
  }
}
