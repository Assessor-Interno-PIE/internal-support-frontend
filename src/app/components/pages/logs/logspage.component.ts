import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-logs-viewer',
  templateUrl: './logs-viewer.component.html',
  styleUrls: ['./logs-viewer.component.scss'],
  standalone: true,
  imports: []
})
export class LogsViewerComponent implements OnInit {
  logs: string[] = [];
  loading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<string[]>('http://localhost:5000/api/logs')
      .subscribe({
        next: (data) => {
          this.logs = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erro ao carregar logs.';
          this.loading = false;
        }
      });
  }
}
