import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  API = ("http://localhost:8080/api/users");

  constructor() { }
  
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
    return this.http.put<string>(this.API+"/update-by-id/"+id, user, {responseType: 'text' as 'json'});
  }

  deleteById(user: User): Observable<string>{
    return this.http.delete<string>(this.API+"/delete-by-id/"+user.id, {responseType: 'text' as 'json'});
  }

}
