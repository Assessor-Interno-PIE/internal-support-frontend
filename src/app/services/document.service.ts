import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Document } from '../models/document';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Department } from '../models/department';
import { HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  http = inject(HttpClient);

  //API = ("http://localhost:5000/api/documents"); //alterei pra porta 5000, estava 8080
  API = environment.API+"/api/documents";

  constructor() { }

  findAll(): Observable<Document[]> {
    return this.http.get<Document[]>(this.API + "/find-all");
  }

  findAllPaginated(page: number, size: number): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(`${this.API}/paginated`, { params });
  }

  findById(id: number): Observable<Document> {
    return this.http.get<Document>(this.API + "/find-by-id/" + id);
  }

  updateDocument(id: number, file: File, document: Document): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('title', document.title);
    formData.append('description', document.description);
    formData.append('departmentId', document.department.id.toString());

    return this.http.put<string>(this.API + "/edit/" + id, formData, { responseType: 'text' as 'json' });
  }

  
  viewDocument(id:number): Observable<Blob>{
    return this.http.get(this.API+"/view/"+id, { responseType: 'blob' });
  }

  //save with upload archive
  saveDocument(file: File, department: Department, title: string, description: string): Observable<string> {
    const formData: FormData = new FormData();
    // add new archives e other date to FormData
    formData.append('file', file);
    formData.append('groupId', department.id.toString());
    formData.append('title', title);
    formData.append('description', description);
    formData.append('addedBy', description);
    // return with request post to backend
    return this.http.post<string>(this.API + "/save", formData, { responseType: 'text' as 'json' });
  }

  downloadDocument(id: number): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(this.API + "/download/" + id, {
      observe: 'response',
      responseType: 'blob' as 'json' // Garantir que o tipo de resposta seja Blob
    });
  }

  //    @DeleteMapping("/{id}")
  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + "/" + id, { responseType: 'text' as 'json' });
  }

  findDocumentsByDepartment(departmentId: string): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.API}/by-department/${departmentId}`);
  }

}