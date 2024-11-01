import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Document } from '../models/document';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  http = inject(HttpClient);

  API = ("http://localhost:8080/api/documents");

  constructor() { }
  
  findAll(): Observable<Document[]>{
    return this.http.get<Document[]>(this.API+"/find-all");
  }

  findById(id: number): Observable<Document>{
    return this.http.get<Document>(this.API+"/find-by-id/"+id);
  }

  save(document: Document): Observable<string>{
    return this.http.post<string>(this.API+"/save", document, {responseType: 'text' as 'json'});
  }

  update(document: Document): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+document.id, document, {responseType: 'text' as 'json'});
  }

  delete(document: Document): Observable<string>{
    return this.http.delete<string>(this.API+"/delete-by-id/"+document.id, {responseType: 'text' as 'json'});
  }
}
