import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  usuario = {
    nome: 'João Graciotim',
    foto: 'https://media-gru2-2.cdn.whatsapp.net/v/t61.24694-24/462754661_1200543907838871_2817234739903803578_n.jpg?ccb=11-4&oh=01_Q5AaIEc1JBUK4c5Dz8inVY9BS6JWaouKG07ch2cQSraK5DJ_&oe=67336AB3&_nc_sid=5e03e0&_nc_cat=100',
  };
}
