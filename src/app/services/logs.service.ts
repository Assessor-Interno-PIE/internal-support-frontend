import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Logs } from '../models/logs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  http = inject(HttpClient);

  API = ("http://localhost:8080/api/logs");

  constructor() { }
  
  findAll(): Observable<Logs[]>{
    return this.http.get<Logs[]>(this.API+"/find-all");
  }

  findById(id: number): Observable<Logs>{
    return this.http.get<Logs>(this.API+"/find-by-id/"+id);
  }

  save(logs: Logs): Observable<string>{
    return this.http.post<string>(this.API+"/save", logs, {responseType: 'text' as 'json'});
  }

  update(logs: Logs): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+logs.id, logs, {responseType: 'text' as 'json'});
  }

  delete(logs: Logs): Observable<string>{
    return this.http.delete<string>(this.API+"/delete-by-id/"+logs.id, {responseType: 'text' as 'json'});
  }
}
