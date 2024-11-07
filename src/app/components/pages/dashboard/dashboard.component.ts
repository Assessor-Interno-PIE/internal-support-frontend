import { Component } from '@angular/core';
import { SearchBarComponent } from "../../search-bar/search-bar.component";
import { CardComponent } from "../../card/card.component";

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
}
