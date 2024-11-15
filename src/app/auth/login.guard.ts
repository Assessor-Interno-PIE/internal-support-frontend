import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './login.service';

export const loginGuard: CanActivateFn = (route, state) => {

  let loginService = inject(LoginService);

  if(!(loginService.hasPermission(1)) && state.url == "/admin/users"){
    alert("Voce nao tem permissao pra acessar essa rota");
    return false;
  }
  return true;

};
