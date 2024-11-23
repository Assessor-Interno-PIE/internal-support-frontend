import { Component, inject } from '@angular/core';
import { SearchBarComponent } from "../../search-bar/search-bar.component";
import { CardComponent } from "../../card/card.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SearchBarComponent, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  usuario = {
    nome: 'João Pedro Canhete',
  };
  
  router = inject(Router);


    // Método para redirecionar para outra página
    navigateToDocuments(): void {
      this.router.navigate(['/admin/documentos']);
    }
}
