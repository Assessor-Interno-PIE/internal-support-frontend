import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department';
import { User } from '../models/user';
import { DepartmentStatsDTO } from '../models/DTO/department-stats-dto';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  http = inject(HttpClient);

  API = ("http://localhost:5000/api/departments"); //alterei pra porta 5000, estava 8080

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
  updateById(id:number, department: Department): Observable<string>{
    return this.http.put<string>(this.API+"/update-by-id/"+id, department, {responseType: 'text' as 'json'});
  }

  // byId
  deleteById(id:number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete-by-id/"+id, {responseType: 'text' as 'json'});
  }

  // coloquei o objeto department entre primeiro parameto
  // porque só id:number, vai pegar do DTO que não tem no back o ID
  departmentStatsById(department: Department, departmentStatsDTO: DepartmentStatsDTO): Observable<DepartmentStatsDTO>{
    return this.http.get<DepartmentStatsDTO>(this.API+"/department-stats/"+department.id)
  }

}