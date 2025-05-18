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
  API = environment.API+"/api/auth";

  constructor() {}

  loginUser(credentials: any): Observable<string> {
    return this.http.post<string>(`${this.API}/login`, credentials, { responseType: 'text' as 'json' });
  }
  

  registerUser(user: Registration): Observable<string> {
    return this.http.post<string>(`${this.API}/register`, user, { responseType: 'text' as 'json' });
  }

  addToken(token: string) {
    try {
      // Parseia o JSON retornado (string) para extrair o access_token
      const tokenData = JSON.parse(token);
      const accessToken = tokenData.access_token;
      if (accessToken) {
        localStorage.setItem('token', accessToken); // Salva apenas o access_token
        console.log('Access token salvo:', accessToken); // Log para depuração
      } else {
        console.error('Nenhum access_token encontrado no JSON retornado');
      }
    } catch (e) {
      console.error('Erro ao parsear o token:', e);
    }
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

  hasPermission(): boolean {
  const token = this.getToken();
  if (!token) return false;

  try {
    const decodedToken: any = jwtDecode(token);
    const roles = decodedToken?.resource_access?.['internal-support']?.roles;

    return Array.isArray(roles) && roles.includes('ADMIN');
  } catch (err) {
    console.error('Erro ao decodificar token:', err);
    return false;
  }
}
}
