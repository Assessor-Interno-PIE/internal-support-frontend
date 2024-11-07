import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  http = inject(HttpClient);

  API = ("http://localhost:8080/api/departments");

  constructor() { }
  
  findAll(): Observable<Department[]>{
    return this.http.get<Department[]>(this.API+"/find-all");
  }

  findById(id: number): Observable<Department>{
    return this.http.get<Department>(this.API+"/find-by-id/"+id);
  }

  save(department: Department): Observable<string>{
    return this.http.post<string>(this.API+"/save", department, {responseType: 'text' as 'json'});
  }

  // byId
  update(id:number, department: Department): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id, department, {responseType: 'text' as 'json'});
  }

  // byId
  delete(id:number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete-by-id/"+id, {responseType: 'text' as 'json'});
  }

  findUsersByDepartment(departmentId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.API}/${departmentId}/users`);
  }

  // Método para buscar documentos de um departamento
  findDocumentsByDepartment(departmentId: number): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.API}/${departmentId}/documents`);
  }
}