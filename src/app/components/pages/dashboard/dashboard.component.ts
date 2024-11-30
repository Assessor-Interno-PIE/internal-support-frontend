import { Component, inject } from '@angular/core';
import { CardComponent } from "../../card/card.component";
import { Router } from '@angular/router';
import { Decoder } from '../../../decoder/decoder';
import { DocumentService } from '../../../services/document.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  documents: Document[] = [];
  documentService = inject(DocumentService);
  usuario = {
    nome: "",
    username: "",
    departamento: "",
    idDepartamento: 0
  }
  numDocs: number = 0 
  decoder = new Decoder();
  
  router = inject(Router);

  constructor () {
    this.getUser();
    this.getNumDocs();
    
  }

  getNumDocs(): void {
    this.documentService.findDocumentsByDepartment(this.usuario.idDepartamento).subscribe(documents => {
        const numDocsL = documents.length;
        this.numDocs = numDocsL;
    });
}

  getUser() {
    const storedValue: string | null = localStorage.getItem('token');
    
    if (storedValue === null) {
        throw new Error("Token not found in localStorage");
    }

    const user = this.decoder.decodeJwt(storedValue);

    if (user) {
        this.usuario.nome = user.name;
        this.usuario.username = user.username;
        this.usuario.departamento = user.department.name;
        this.usuario.idDepartamento = user.department.id;
    } else {
        throw new Error("Invalid token structure");
    }
  }

    // Método para redirecionar para outra página
    navigateToDocuments(): void {
      this.router.navigate(['/admin/documentos']);
    }
}
