import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Document } from '../models/document';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  http = inject(HttpClient);

  API = ("http://localhost:5000/api/documents"); //alterei pra porta 5000, estava 8080

  constructor() { }
  
  findAll(): Observable<Document[]>{
    return this.http.get<Document[]>(this.API+"/find-all");
  }

  findById(id: number): Observable<Document>{
    return this.http.get<Document>(this.API+"/find-by-id/"+id);
  }

  //save with upload archive
  saveDocument(file: File, department: Department, title: string, description:string): Observable<string>{
    const formData: FormData = new FormData();
    // add new archives e other date to FormData
    formData.append('file', file);
    formData.append('departmentId', department.id.toString());
    formData.append('title', title);
    formData.append('description', description);
    // return with request post to backend
    return this.http.post<string>(this.API+"/save", formData, {responseType: 'text' as 'json'});
  }

  downloadDocument(id:number): Observable<Document>{
    return this.http.get<Document>(this.API+"/download/"+id);
  }

}
