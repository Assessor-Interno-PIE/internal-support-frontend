import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackgroundService } from '../../services/background.service';

@Component({
  selector: 'app-background-manager',
  standalone: true,
  imports: [],
  templateUrl: './background-manager.component.html',
  styleUrl: './background-manager.component.scss'
})
export class BackgroundManagerComponent implements OnDestroy {
  private backgroundSubscription: Subscription;

  constructor(private backgroundService: BackgroundService) {
    // Inscreve-se no Observable para alterar o plano de fundo dinamicamente
    this.backgroundSubscription = this.backgroundService.background$.subscribe(
      (imageUrl: string) => {
        this.applyBackground(imageUrl);
      }
    );

    // Aplicar a imagem padrão ou a armazenada no localStorage ao iniciar
    const savedBackgroundImage = localStorage.getItem('backgroundImage');
    this.applyBackground(savedBackgroundImage || this.backgroundService.defaultImageUrl);
  }

  private applyBackground(imageUrl: string) {
    document.body.style.backgroundImage = `url(${imageUrl})`;
  }

  ngOnDestroy() {
    if (this.backgroundSubscription) {
      this.backgroundSubscription.unsubscribe();
    }
  }
}
