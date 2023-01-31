import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  uploadFile(data: any[], sheet: string) {
    // Revisa el nombre de la hoja de calculo
    if(sheet == 'Alumnos') {
      // Filtra solo lo necesario de la hoja de calculo con la información de los alumnos
      let studentsData = [{}];
      data.forEach(element => {
        studentsData.push({
          _id: element.Matricula,
          name: element.NombreDelAlumno
        })
      });
      const finalStudentsData = {
        "students": studentsData
      };

      // Limpiamos la colección de estudiantes
      this.http.delete('api/students').subscribe(
        (res) => {
          // Agregamos los nuevos estudiantes
          this.http.post('api/students/file-upload', finalStudentsData).subscribe(
            (res) => {
              this.messageService.add({severity:'success', summary:'Estudiantes agregados exitosamente'});
            },
            (err) => {
              this.messageService.add({severity:'error', summary:'Ocurrio un error al agregar estudiantes'});
              console.log(err);
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    } else if(sheet == 'Horarios') {
      // Filtra la información como profesores y cursos actuales
      let professorsData = [{}];
      let coursesData = [{}];
      data.forEach(element => {
        professorsData.push({
          _id: element.Cve_Empleado,
          name: element.Nombre,
        });
        coursesData.push({
          code: element.Clave,
          name: element.Materia,
          group: element.Grupo,
          labs: [ element.L_SalonGrupo, element.M_SalonGrupo, element.MM_SalonGrupo, element.J_SalonGrupo, element.V_SalonGrupo, element.S_SalonGrupo, element.D_SalonGrupo ],
          professor: element.Cve_Empleado
        })
      });
      // Curso especial para el caso de registrar invitados
      coursesData.push({
        code: 'GUEST',
        name: 'Invitados',
        group: 'GUEST',
        labs: [],
        professor: null
      });

      const finalProfessorsData = {
        "professors": professorsData
      };
      const finalCoursesData = {
        "courses": coursesData
      };
      
      // Limpiamos la colección de profesores
      this.http.delete('api/professors').subscribe(
        (res) => {
          // Agregamos los nuevos profesores
          this.http.post('api/professors/file-upload', finalProfessorsData).subscribe(
            (res) => {
              this.messageService.add({severity:'success', summary:'Profesores agregados exitosamente'});
            },
            (err) => {
              this.messageService.add({severity:'error', summary:'Ocurrio un error al agregar profesores'});
              console.log(err);
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
      
      // Limpiamos la colección de los cursos
      this.http.delete('api/courses').subscribe(
        (res) => {
          // Agregamos los nuevos cursos
          this.http.post('api/courses/file-upload', finalCoursesData).subscribe(
            (res) => {
              this.messageService.add({severity:'success', summary:'Cursos agregados exitosamente'});
            },
            (err) => {
              this.messageService.add({severity:'error', summary:'Ocurrio un error al agregar cursos'});
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  getUsers(): Observable<any> {
    return this.http.get<any>('api/users');
  }

  getLabs(): Observable<any> {
    return this.http.get<any>('api/courses/current-labs/list');
  }

  addUser(user: any): Observable<any> {
    return this.http.post('api/auth/register', user);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.patch(`api/users/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`api/users/${id}`);
  }
}
