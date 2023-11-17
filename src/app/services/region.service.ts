import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private readonly regionesUrl = 'assets/regiones.json';

  constructor(private http: HttpClient) { }
  // Obtiene las regiones desde el archivo JSON
  getRegiones(): Observable<any> {
    return this.http.get<any>(this.regionesUrl);
  }
}
