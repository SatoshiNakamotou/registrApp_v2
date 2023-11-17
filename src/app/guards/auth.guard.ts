// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
      
    if (this.authService.isLoggedIn()) {
        // Usuario autenticado, permite el acceso
        return true;
    } else {
        // Usuario no autenticado, redirige a la página de inicio de sesión
        this.router.navigate(['/login']);
        return false;
        }
  }
}
