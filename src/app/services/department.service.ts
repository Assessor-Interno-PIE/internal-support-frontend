import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department';
import { User } from '../models/user';
import { DepartmentStatsDTO } from '../models/DTO/department-stats-dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  http = inject(HttpClient);

  //API = ("http://localhost:5000/api/departments"); //alterei pra porta 5000, estava 8080
  API = environment.API+"/api/keycloak";

  constructor() { }
  
  findAll(): Observable<Department[]>{
    return this.http.get<Department[]>(this.API+"/groups");
  }

  findAllPaginated(page: number, size: number): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(`${this.API}/find-all/paginated`, { params });
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