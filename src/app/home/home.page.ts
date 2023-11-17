import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  async autenticar() {
    const autenticado = await this.authService.autenticarUsuario(this.username, this.password);

    if (autenticado) {
      console.log('Usuario autenticado');
      // Realiza acciones adicionales si es necesario
      this.router.navigate(['/login']);
    } else {
      console.error('Credenciales incorrectas');
      // Muestra un mensaje al usuario o realiza otras acciones si las credenciales son incorrectas
    }
  }
  async IrARegistro() {
    this.router.navigate(['/register-user']);
  }
  async IrARecuperacion() {
    this.router.navigate(['/recuperacion']);
  }
}
