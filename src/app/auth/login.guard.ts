import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const loginGuard: CanActivateFn = (route, state) => {

  let authService = inject(AuthService);

  if(!(authService.hasPermission()) && state.url == "/admin/users"){
    alert("Voce nao tem permissao pra acessar essa rota");
    return false;
  }
  return true;

};
