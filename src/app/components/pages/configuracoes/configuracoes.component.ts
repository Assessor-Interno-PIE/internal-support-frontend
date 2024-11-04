import { Component, OnInit } from '@angular/core';
import { BackgroundService } from '../../../services/background.service';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';

interface BackgroundOption {
  type: 'image';
  value: string;
  label: string;
}

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent implements OnInit {
  backgroundOptions: BackgroundOption[] = [
    { type: 'image', value: '/assets/images/background.jpeg', label: 'Imagem 1' },
    { type: 'image', value: 'assets/images/background2.jpg', label: 'Imagem 2' },
    { type: 'image', value: 'assets/images/background3.jpg', label: 'Imagem 3' },
    { type: 'image', value: 'assets/images/background4.jpeg', label: 'Imagem 4' },
    { type: 'image', value: 'assets/images/background5.jpg', label: 'Imagem 5' },
    { type: 'image', value: 'assets/images/background6.jpeg', label: 'Imagem 6' },
    { type: 'image', value: 'assets/images/background7.jpg', label: 'Imagem 7' },
  ];

  private changeBackgroundSubject = new Subject<string>();

  constructor(private backgroundService: BackgroundService) { }

  ngOnInit() {
    this.preloadImages();
    this.changeBackgroundSubject
      .pipe(debounceTime(300)) // Aguarda 300ms antes de chamar a mudança
      .subscribe(url => this.setBackground(url));
  }

  preloadImages() {
    this.backgroundOptions.forEach(option => {
      const img = new Image();
      img.src = option.value;
    });
  }

  setBackground(url: string) {
    console.log('Mudando fundo para:', url);
    this.backgroundService.setBackground(url);
  }

  onBackgroundChange(option: BackgroundOption) {
    this.changeBackgroundSubject.next(option.value); // Chama o método de mudança de fundo
  }

  
  isDropdownOpen: boolean = false;


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    window.location.href = '/login';
    localStorage.removeItem('backgroundImage');
  }
}
