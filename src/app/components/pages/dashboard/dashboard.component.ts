import { Component } from '@angular/core';
import { SideBarComponent } from "../../side-bar/side-bar.component";
import { SearchBarComponent } from "../../search-bar/search-bar.component";
import { CardComponent } from "../../card/card.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideBarComponent, SearchBarComponent, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
