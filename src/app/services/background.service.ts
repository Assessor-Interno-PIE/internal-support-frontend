import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from './loading.service'; // Importando o LoadingService

@Injectable({
    providedIn: 'root',
})
export class BackgroundService {
    public defaultImageUrl = '/assets/images/background.jpeg';

    private backgroundSubject = new BehaviorSubject<string>(
        localStorage.getItem('backgroundImage') || this.defaultImageUrl
    );

    background$ = this.backgroundSubject.asObservable();

    constructor(private loadingService: LoadingService) { } // Injetando o LoadingService

    setBackground(imageUrl: string) {
       // this.loadingService.show(); // Mostra a tela de carregamento
        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
            this.backgroundSubject.next(imageUrl);
            localStorage.setItem('backgroundImage', imageUrl);
            document.body.style.backgroundImage = `url(${imageUrl})`; // Atualiza somente após o carregamento
           // this.loadingService.hide(300); // Atraso de 300ms
        };

        img.onerror = () => {
            console.error('Erro ao carregar a imagem:', imageUrl);
            this.backgroundSubject.next(this.defaultImageUrl);
            document.body.style.backgroundImage = `url(${this.defaultImageUrl})`; // Aplica imagem padrão
           // this.loadingService.hide(300); // Atraso de 300ms
        };
    }
}
