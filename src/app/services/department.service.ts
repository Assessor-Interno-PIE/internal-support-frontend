import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department';

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

  update(department: Department): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+department.id, department, {responseType: 'text' as 'json'});
  }

  delete(department: Department): Observable<string>{
    return this.http.delete<string>(this.API+"/delete-by-id/"+department.id, {responseType: 'text' as 'json'});
  }
}
