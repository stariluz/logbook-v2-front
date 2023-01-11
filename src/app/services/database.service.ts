import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  uploadFile(data: Object, sheet: string): Observable<any> {
    let convertedData;
    if(sheet == 'Alumnos') {
      convertedData = {
        "Estudiantes": data
      };
      return this.http.post(`${environment.apiUrl}/students`, convertedData);
    } else if(sheet == 'Horarios') {
      convertedData = {
        "Cursos": data
      };
      return this.http.post(`${environment.apiUrl}/courses`, convertedData);
    }
    return EMPTY;
  }
}
