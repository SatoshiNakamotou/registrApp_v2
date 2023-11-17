import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async autenticarUsuario(username: string, password: string): Promise<boolean> {
    try {
      const key = 'user_data_' + username;
  
      // Verifica si el usuario está registrado
      const userData = await Preferences.get({ key: key });
  
      if (userData && typeof userData.value === 'string') {
        // Si userData.value es una cadena, intenta analizarla como JSON
        const userDataObject = JSON.parse(userData.value);
  
        // Verifica si el usuario tiene la propiedad 'password'
        if (userDataObject && userDataObject.password) {
          const storedPasswordHash = userDataObject.password; // Obtener la contraseña almacenada
  
          // Verifica si la contraseña proporcionada coincide con la almacenada
          const inputPasswordHash = await this.hashPassword(password);
  
          if (storedPasswordHash === inputPasswordHash) {
            // La autenticación fue exitosa
            return true;
          } else {
            // Contraseña incorrecta
            console.error('Contraseña incorrecta');
          }
        } else {
          // El objeto de usuario no tiene la propiedad 'password'
          console.error('Datos de usuario incompletos');
        }
      } else {
        // No se encontraron datos para el usuario
        console.error('Usuario no registrado');
      }
  
      // Autenticación fallida en cualquier otro caso
      return false;
    } catch (error) {
      console.error('Error en la autenticación:', error);
      return false;
    }
  }
    // Método para hashear la contraseña
  private async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
}
