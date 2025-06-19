import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {
  API = environment.API + "/api/logs";

  constructor(private http: HttpClient) {}

  getAuditLogs(page: number, size: number, sortBy: string, sortDir: string, filters: any): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    // Adiciona os parâmetros de filtro dinamicamente se eles tiverem valor
    if (filters.startDate) {
      params = params.append('startDate', filters.startDate);
    }
    if (filters.endDate) {
      params = params.append('endDate', filters.endDate);
    }
    if (filters.userId) {
      params = params.append('userId', filters.userId);
    }
    if (filters.endpoint) {
      params = params.append('endpoint', filters.endpoint);
    }
    if (filters.method) {
      // Assumindo que o backend espera o parâmetro como 'httpMethod'
      params = params.append('httpMethod', filters.method);
    }

    return this.http.get(`${this.API}/audit`, { params });
  }
}
