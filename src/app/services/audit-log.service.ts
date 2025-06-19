import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {
  API = environment.API+"/api/logs";

  constructor(private http: HttpClient) {}

  getAuditLogs(page: number, size: number, sortBy: string, sortDir: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    return this.http.get(`${this.API}/audit`, { params });
  }
}
