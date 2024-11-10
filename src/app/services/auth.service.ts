import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);

  API = ("http://localhost:5000/api/auth"); //alterei pra porta 5000, estava 8080

  constructor() { }



  login(username: string, password: string): Observable<User> {
    // Cria os parâmetros de consulta
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
  
    // Envia a requisição GET com os parâmetros
    return this.http.get<User>(`${this.API}/login`, { params });
  }
  
}
