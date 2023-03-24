import { Component, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { EntriesService } from 'src/app/services/entries.service';

// Tipado de objeto para la busqueda de alumnos registrados
type RegisteredStudent = { registryId: string; studentId: string; name: string; course: string; date: String }
type AlertMessage = { message: string; type: string }
type User = { name: string; email: string; role: string; lab: string};

@Component({
  selector: 'app-ss-entries',
  templateUrl: './ss-entries.component.html',
  styleUrls: ['./ss-entries.component.css', './ss-entries.component.scss']
})
export class SsEntriesComponent {
  public studentId?: string;
  private requestInProgress: boolean = false;
  public registeredStudents: Array<RegisteredStudent> = [];
  public currentCourse: any;
  private user: any;
  public c_User: any;

  // Atributos relacionados con la cámara
  scannerEnabled = false;

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert?: NgbAlert;
  private _message = new Subject<string>();
  alertMessage: AlertMessage = {
    message: '',
    type: ''
  };

  constructor(private entriesService: EntriesService) { }

  ngOnInit(): void {
      this.c_User = localStorage.getItem('user');
      if (this.c_User) {
        this.c_User = JSON.parse(this.c_User);
      }
  }

  // En el caso que se haya escaneado un codigo exitosamente, ...
  scanSuccessHandler(event: any){
    this.studentId = event;
    document.getElementById("qr-scanner")?.setAttribute("class", "border border-4 w-75 rounded border-success");
    this.registerStudentEntry();
    setTimeout(function() {
      document.getElementById("qr-scanner")?.setAttribute("class", "border rounded w-75");
    }, 1000);
  }
  
  // Revisión que la matrícula se haya ingresado, para posteriormente guardar la matrícula en el almacenamiento local dentro de un arreglo
  registerStudentEntry() {
    // Revisamos que se haya ingresado una matrícula
    if(!this.studentId) {
      this._message.next(`Porfavor ingrese la matrícula del alumno`);
      this.alertMessage.type = 'danger';
      return;
    }

    // Eliminamos los números 4400 de la matrícula escaneada
    if(this.studentId.endsWith('4400') && this.studentId.startsWith('A')) {
      this.studentId = this.studentId.substr(1, 6);
    }

    // Revisa si el alumno ya se ha registrado
    let registered = false;
    this.registeredStudents.forEach((element: RegisteredStudent) => {
      if(element.studentId == this.studentId) {
        if(element.course == this.currentCourse.name) {
          registered = true;
        }
      }
    });
    if(registered) {
      this._message.next(`Este alumno ya ha sido registrado`);
      this.alertMessage.type = 'danger';
      this.studentId = '';
      return;
    }

    // Revisa si existe una petición en curso
    if(this.requestInProgress) {
      this._message.next(`Porfavor espere a que termine de ser registrada la entrada anterior`);
      this.alertMessage.type = 'warning';
      return;
    }

    // Indicamos que se ha iniciado una petición
    this.requestInProgress = true;
    this.entriesService.getCourse(this.currentCourse._id).subscribe(
      (res) => {
        // Creamos el objeto de la entrada
        const entry = {
          date: new Date(),
          course: res,
          student: this.studentId,
          lab: this.user.user.lab
        }
        // Registramos la nueva entrada
        this.entriesService.registerStudentEntry(entry).subscribe(
          (res) => {
            // Revisamos si existe alumno en la base de datos con dicha matrícula
            if(res.status == 400) {
              this._message.next(`No se tiene alumno registrado con esta matrícula`);
              this.alertMessage.type = 'danger';
              this.studentId = '';
            } else {
              this._message.next(`Alumno registrado correctamente`);
              this.alertMessage.type = 'success';
              this.registeredStudents = [...this.registeredStudents, {
                registryId: res._id,
                studentId: res.student._id,
                name: res.student.name,
                course: this.currentCourse.name,
                date: res.date
              }];
              localStorage.setItem('registeredStudents', JSON.stringify(this.registeredStudents));
              this.studentId = '';
            }
            // Indicamos que ha terminado la petición
            this.requestInProgress = false;
          },
          (err) => {
            // Indicamos que ha terminado la petición
            this.requestInProgress = false;
            console.log(err);
          }
        );
      },
      (err) => {
        // Indicamos que ha terminado la petición
        this.requestInProgress = false;
        console.log(err);
      }
    );
  }

  deleteRegistry(registryId: string) {
    // Elimiamos el registro de la base de datos
    this.entriesService.deleteStudentEntry(registryId).subscribe(
      (res) => {
        this._message.next(`Registro eliminado correctamente`);
        this.alertMessage.type = 'info';
        // Obtenemos el indice del elemento eliminado con el id del estudiante
        let index = this.registeredStudents.findIndex((element: RegisteredStudent) => element.studentId == res.student);
        // Eliminamos el elemento del arreglo
        this.registeredStudents.splice(index, 1);
        this.registeredStudents = [...this.registeredStudents];
        localStorage.setItem('registeredStudents', JSON.stringify(this.registeredStudents));
      },
      (err) => {
        this._message.next(`No se pudo eliminar el registro debido a un error en el servidor`);
        console.log(err);
      }
    )
  }
}
