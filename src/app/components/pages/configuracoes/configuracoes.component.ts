import { Component } from '@angular/core';
import { SideBarComponent } from '../../side-bar/side-bar.component';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [SideBarComponent],
  templateUrl: './configuracoes.component.html',
  styleUrl: './configuracoes.component.scss'
})
export class ConfiguracoesComponent {

}
