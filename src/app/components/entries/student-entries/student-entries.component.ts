import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';
import { EntriesService } from 'src/app/services/entries.service';

// Tipado de objeto para la busqueda de alumnos registrados
type RegisteredStudent = { studentId: string; name: string; course: string; date: String }
type AlertMessage = { message: string; type: string }

@Component({
  selector: 'app-student-entries',
  templateUrl: './student-entries.component.html',
  styleUrls: ['./student-entries.component.css', './student-entries.component.scss']
})
export class StudentEntriesComponent {

  public studentId?: string;
  public registeredStudents: Array<RegisteredStudent> = [];
  public currentCourse: any;

  // Atributos relacionados con la cámara
  cameras: MediaDeviceInfo[]=[];
  myDevice!: MediaDeviceInfo;
  scannerEnabled = false;

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert?: NgbAlert;
  private _message = new Subject<string>();
  alertMessage: AlertMessage = {
    message: '',
    type: ''
  };

  constructor(private router: Router, private entriesService: EntriesService) { }

  ngOnInit(): void {
    // Tomamos el objeto del curso actual
    this.currentCourse = localStorage.getItem('currentCourse');
    this.currentCourse = JSON.parse(this.currentCourse);
    // Almacenamos los alumnos que ya se han registrado al curso
    let registered: any = localStorage.getItem('registeredStudents');
    registered = JSON.parse(registered);
    if(registered) {
      this.registeredStudents = registered;
    }
    // Tiempo de duración y mensaje de la alerta
		this._message.subscribe((message) => (this.alertMessage.message = message));
		this._message.pipe(debounceTime(4000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
  }

  // Indica las camaras que se encontraron en el dispositivo
  camerasFoundHandler(cameras: MediaDeviceInfo[]){
    this.cameras = cameras;
    this.selectCamera(this.cameras[0].label);
  }

  // En el caso que se haya escaneado un codigo exitosamente, ...
  scanSuccessHandler(event: any){
    this.studentId = event.substr(1, 6);
    document.getElementById("qr-scanner")?.setAttribute("class", "border border-4 rounded border-success");
    this.registerStudentEntry();
    setTimeout(function() {
      document.getElementById("qr-scanner")?.setAttribute("class", "border rounded");
    }, 1000);
  }

  // Abre la opción para seleccionar una camara
  selectCamera(cameraLabel: any){    
    this.cameras.forEach(camera=>{
      if(camera.label.includes(cameraLabel)){
        this.myDevice=camera;
        this.scannerEnabled=true;
      }
    })    
  }
  
  // Revisión que la matrícula se haya ingresado, para posteriormente guardar la matrícula en el almacenamiento local dentro de un arreglo
  registerStudentEntry() {
    if(!this.studentId) {
      this._message.next(`Porfavor ingrese la matrícula del alumno`);
      this.alertMessage.type = 'danger';
      return;
    } 
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
    } else {
      this.entriesService.registerStudentEntry({}).subscribe(
        (res) => {
          // TODO: Check if correct status
        },
        (err) => {
          console.log(err);
        }
      );
      this._message.next(`Alumno registrado correctamente`);
      this.alertMessage.type = 'success';
      this.registeredStudents = [...this.registeredStudents, {
        studentId: this.studentId,
        name: 'Mario Alberto Terán Acosta',
        course: this.currentCourse.name,
        date: new Date().toLocaleString()
      }];
      localStorage.setItem('registeredStudents', JSON.stringify(this.registeredStudents));
      this.studentId = '';
    }
  }
}
