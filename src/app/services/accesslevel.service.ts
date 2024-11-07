import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Accesslevel } from '../models/accesslevel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccesslevelService {

  http = inject(HttpClient);

  API = ("http://localhost:8080/api/access-levels");

  constructor() { }
  
  findAll(): Observable<Accesslevel[]>{
    return this.http.get<Accesslevel[]>(this.API+"/find-all");
  }

  findById(id: number): Observable<Accesslevel>{
    return this.http.get<Accesslevel>(this.API+"/find-by-id/"+id);
  }

  save(accesslevel: Accesslevel): Observable<string>{
    return this.http.post<string>(this.API+"/save", accesslevel, {responseType: 'text' as 'json'});
  }

  update(id:number, accesslevel: Accesslevel): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id, accesslevel, {responseType: 'text' as 'json'});
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete-by-id/"+id, {responseType: 'text' as 'json'});
  }
}