import { Component } from '@angular/core';
import { SideBarComponent } from '../../side-bar/side-bar.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [SideBarComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {

}
