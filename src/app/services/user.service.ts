import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  //API = ("http://localhost:5000/api/users"); //alterei pra porta 5000, estava 8080
  API = environment.API+"/api/users";

  constructor() { }

  findAllPaginated(page: number, size: number): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(`${this.API}/find-all/paginated`, { params });
  }
  
  findAll(): Observable<User[]>{
    return this.http.get<User[]>(this.API+"/find-all");
  }

  findById(id: number): Observable<User>{
    return this.http.get<User>(this.API+"/find-by-id/"+id);
  }

  save(user: User): Observable<string>{
    return this.http.post<string>(this.API+"/save", user, {responseType: 'text' as 'json'});
  }

  updateById(id:number, user: User): Observable<string>{
    console.log("isAdmin:" + user.isAdmin);
    return this.http.put<string>(this.API+"/update-by-id/"+id, user, {responseType: 'text' as 'json'});
  }

  deleteById(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete-by-id/"+id, {responseType: 'text' as 'json'});
  }

  findUsersByDepartment(departmentId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.API}/by-department/${departmentId}`);
  }

    updatePassword(userId: number, newPassword: string): Observable<string> {
      const url = `${this.API}/${userId}/password`;
      const body = { password: newPassword }; // A senha deve estar no formato esperado pelo backend
    
      return this.http.patch<string>(url, body, { responseType: 'text' as 'json' });
    }
}
