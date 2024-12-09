import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Login } from './login';
import { User } from '../models/user';
import { Registration } from './registration';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  http = inject(HttpClient);
  //API = 'http://localhost:5000/api';
  API = environment.API+"/api";

  constructor() {}

  loginUser(credentials: any): Observable<string> {
    return this.http.post<string>(`${this.API}/login`, credentials, { responseType: 'text' as 'json' });
  }
  

  registerUser(user: Registration): Observable<string> {
    return this.http.post<string>(`${this.API}/register`, user, { responseType: 'text' as 'json' });
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return '';
  }

  hasPermission(isAdmin: number) {
    let user = this.jwtDecode() as User;
    return user.isAdmin === 1;
  }
}
