import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { User } from '../models/user.models';
import { AlertController } from '@ionic/angular';
import { RegionService } from './region.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(private regionService: RegionService, private alertController: AlertController) { }

  async guardarUsuarioEnPreferences(usuario: User): Promise<boolean> {
    try {
      if (!this.validarUsuario(usuario)) {
        // Si la validación del usuario falla, retorna false
        return false;
      }
  
      const key = 'user_data_' + usuario.username;
  
      // Verifica si el usuario ya está registrado
      const existingUser = await Preferences.get({ key: key });
      if (existingUser && existingUser.value) {
        // El usuario ya está registrado, muestra una alerta o toma otras acciones
        this.presentAlert('Error', 'El usuario ya está registrado');
        return false;
      }
  
      // Hash de la contraseña utilizando SHA-256
      const passwordHash = await this.hashPassword(usuario.password);
  
      // Actualiza la contraseña del usuario con el hash antes de almacenarlo
      usuario.password = passwordHash;
  
      // Si el usuario no está registrado, guárdalo en Preferences
      await Preferences.set({
        key: key,
        value: JSON.stringify(usuario),
      });
  
      this.presentAlert('Registro Ok', 'Usuario registrado');
  
      console.log('User stored in Preferences with key:', key);
  
      // Retorna true indicando que el usuario fue agregado con éxito
      return true;
    } catch (error) {
      console.error('Error storing user in Preferences:', error);
      // Retorna false en caso de error
      return false;
    }
  }
  validarUsuario(usuario: User): boolean {
    // Implementa las validaciones aquí
    let isValid = true;

    // Ejemplo de validación: Verifica que el nombre de usuario no esté vacío
    if (!usuario.username || usuario.username.trim() === '') {
      // Puedes mostrar un mensaje de error o realizar otras acciones en caso de fallo
      this.presentAlert('Error', 'Favor ingrese nombre usuario');return false;

    }
    else if (!usuario.name      || usuario.name.trim() === '') 
    {
      isValid = false;this.presentAlert('Error', 'favor ingresar nombre');return false;
    }
    else if (!usuario.lastName  || usuario.lastName.trim() === '') 
    {
      isValid = false;this.presentAlert('Error', 'favor ingresar apellido');return false;
    }
    else if (!usuario.rut       || usuario.rut.trim() === '') 
    {
      isValid = false;this.presentAlert('Error', 'favor ingresar rut');return false;
    }
    else if (!usuario.email     || usuario.email.trim() === '') 
    {
      isValid = false;this.presentAlert('Error', 'favor ingresar email');return false;
    }
    else if (!usuario.career    || usuario.career.trim() === '') 
    {
      isValid = false;this.presentAlert('Error', 'favor ingresar carrera');return false;
    }
    else if (!usuario.region    || usuario.region.trim() === '') 
    {
      isValid = false;this.presentAlert('Error', 'favor ingresar region');return false;
    }
    else if (!usuario.commune   || usuario.commune.trim() === '') 
    {
      isValid = false;this.presentAlert('Error', 'favor ingresar comuna');return false;
    }
    else if (!usuario.address   || usuario.address.trim() === '') 
    {
      isValid = false;this.presentAlert('Error', 'favor ingresar direccion');return false;
    }
    else if (!usuario.password  || usuario.password.trim() === '') 
    {
      isValid = false;this.presentAlert('Error', 'favor ingresar paswword');return false;
    }
    // Agrega más validaciones según tus requisitos
    return true;
  }

  // Agrega esta función para mostrar la alerta
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

}
