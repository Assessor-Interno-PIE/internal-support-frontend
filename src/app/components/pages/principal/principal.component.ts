import { Component } from '@angular/core';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from "../../search-bar/search-bar.component";

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

}
