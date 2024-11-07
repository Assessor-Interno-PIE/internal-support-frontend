import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackgroundService } from './services/background.service';
import { BackgroundManagerComponent } from './components/background-manager/background-manager.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, BackgroundManagerComponent, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  isLoading = true; // Defina como true para mostrar o spinner inicialmente

  constructor(private backgroundService: BackgroundService) {
    const savedBackgroundImage = localStorage.getItem('backgroundImage');
    this.backgroundService.setBackground(savedBackgroundImage || this.backgroundService.defaultImageUrl);
  }
}