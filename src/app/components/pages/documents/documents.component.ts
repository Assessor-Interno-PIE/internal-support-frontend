import { Component } from '@angular/core';
import { SideBarComponent } from "../../side-bar/side-bar.component";
import { CardComponent } from '../../card/card.component';
import { SearchBarComponent } from '../../search-bar/search-bar.component';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [SideBarComponent, CardComponent, SearchBarComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {

}
