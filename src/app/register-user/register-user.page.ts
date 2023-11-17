import { Component, OnInit } from '@angular/core';
import { RegionService } from '../services/region.service';
import { User } from '../models/user.models';
import { RegisterUserService } from '../services/register-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})

export class RegisterUserPage implements OnInit {
  regionesData: any = {}; // objeto para almacenar json de regiones y comunas
  regiones_list: string[] = []; // Array para almacenar solo las regiones
  selectedRegion: string = ''; // regiones seleccionada
  commune_list: string[] = []; // Array para almacenar solo las regiones
  selectedCommune: string = ''; // comuna seleccionada
  repetirContrasena: string = ''; // comuna seleccionada 

  userData: User = new User('', '', '', '', '', '', '', '', '', '');

  constructor(private regionService: RegionService, 
              private registerUserService: RegisterUserService, 
              private router: Router
  ) {}

  ngOnInit() {
    // Llama al servicio para obtener las regiones cuando la página se inicia
    this.regionService.getRegiones().subscribe(data => {
      this.regionesData = data;
      this.obtenerRegiones(data);
      console.log(this.regiones_list);
    });
  }

  obtenerRegiones(data: any): void {
    this.regiones_list = data.regiones.map((region: { region: string }) => region.region);
    // Puedes hacer más cosas con regionesData aquí
  }

  obtenerComuna(selectedRegion: string): void {
    // Verifica que la región seleccionada no esté vacía
    if (selectedRegion) {
      // Encuentra el objeto de la región seleccionada en regionesData
      const regionSeleccionada = this.regionesData.regiones.find(
        (region: { region: string; comunas: string[] }) => region.region === selectedRegion
      );

      // Si se encuentra la región, actualiza commune_list con las comunas de esa región
      if (regionSeleccionada) {
        this.commune_list = regionSeleccionada.comunas;
      } else {
        // Si no se encuentra la región, establece commune_list como vacío
        this.commune_list = [];
      }
    } else {
      // Si la región seleccionada está vacía, establece commune_list como vacío
      this.commune_list = [];
    }
  }

  async guardarUsuario(): Promise<void> {
    // Obtener el usuario a partir de los datos del formulario
    const usuario = this.obtenerDatosUsuario();

    // Validar que las contraseñas coincidan
    if (this.userData.password !== this.repetirContrasena) {
      // Mostrar mensaje de error si las contraseñas no coinciden
      console.error('Las contraseñas no coinciden');
      // Puedes agregar lógica adicional, como mostrar una alerta al usuario
      this.registerUserService.presentAlert('Error', 'Favor las contraseñas no coinciden');
      return;
    } else {
      try {
        const usuarioAgregado = await this.registerUserService.guardarUsuarioEnPreferences(usuario);

        if (usuarioAgregado) {
          // El usuario se agregó correctamente
          // Puedes realizar acciones adicionales si es necesario
          this.router.navigate(['/home']);
        } else {
          // Hubo un problema al agregar el usuario
          // Puedes manejar el error o mostrar un mensaje al usuario
          this.registerUserService.presentAlert('Error en registro', 'favor validar campos');
        }
      } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante la operación asíncrona
        console.error('Error al registrar el usuario:', error);
      }
    }
  }

  registrarUsuario(): void {
    // Implementa la lógica para registrar al usuario
    console.log('Registrando usuario:', this.userData);
    // ejecutar obtenerDatosUsuario(): y guardarlo en una variable
  }

  obtenerDatosUsuario(): User {
    // Crea un nuevo objeto User con los datos del formulario
    const usuario: User = new User(
      this.userData.username,
      this.userData.name,
      this.userData.lastName,
      this.userData.rut,
      this.userData.email,
      this.userData.career,
      this.selectedRegion,
      this.selectedCommune,
      this.userData.address,
      this.userData.password
    );

    return usuario;
  }
}
