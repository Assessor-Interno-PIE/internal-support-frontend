import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const httpInterceptor: HttpInterceptorFn = (request, next) => {

  let router = inject(Router);

  // inclui o token do local storage em cada request http
  let token = localStorage.getItem('token');
  if (token && !router.url.includes('/login')) {
    request = request.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    });
  }

  // tratamento dos responses, genericos
  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        
        // Tratamento para erro 401 - Unauthorized
        if (err.status === 401) {
          console.warn('Erro 401 - Não autorizado');
          Swal.fire('Erro!', 'Sessão expirada ou credenciais inválidas. Você será redirecionado para o login.', 'error');
          router.navigate(['/login']);
        }
        
        // Tratamento para erro 403 - Forbidden
        else if (err.status === 403) {
          console.warn('Erro 403 - Acesso proibido');
          Swal.fire('Erro!', 'Você não tem permissão para acessar este recurso.', 'error');
          router.navigate(['/login']);
        }
        
        // Tratamento para outros erros HTTP (ex.: 500, 404)
        else if (err.status >= 400 && err.status < 500) {
          console.error('Erro do cliente:', err);
          Swal.fire('Erro!', 'Ocorreu um erro ao processar sua requisição. Tente novamente mais tarde.', 'error');
        } else if (err.status >= 500) {
          console.error('Erro do servidor:', err);
          Swal.fire('Erro!', 'Ocorreu um erro no servidor. Tente novamente mais tarde.', 'error');
        }
        
      } else {
        console.error('Erro inesperado:', err);
        Swal.fire('Erro!', 'Ocorreu um erro inesperado. Tente novamente mais tarde.', 'error');
      }
  
      return throwError(() => err);
    })
  );  
};
