import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';
import { EntriesService } from 'src/app/services/entries.service';

// Tipado de objeto para la busqueda de alumnos registrados
type RegisteredStudent = { courseId: string; studentId: string }

@Component({
  selector: 'app-student-entries',
  templateUrl: './student-entries.component.html',
  styleUrls: ['./student-entries.component.css']
})
export class StudentEntriesComponent {

  public studentId?: string;
  public registeredIds: Array<RegisteredStudent> = [];
  public currentCourse: any;

  // Atributos relacionados con la cámara
  cameras: MediaDeviceInfo[]=[];
  myDevice!: MediaDeviceInfo;
  scannerEnabled = false;

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert?: NgbAlert;
  private _message = new Subject<string>();
  errorMessage: string = '';

  constructor(private router: Router, private entriesService: EntriesService) { }

  ngOnInit(): void {
    // Tomamos el objeto del curso actual
    this.currentCourse = localStorage.getItem('currentCourse');
    this.currentCourse = JSON.parse(this.currentCourse);
    // Almacenamos los alumnos que ya se han registrado al curso
    let registered: any = localStorage.getItem('registeredIds');
    registered = JSON.parse(registered);
    if(registered) {
      this.registeredIds = registered;
    }
    // Tiempo de duración y mensaje de la alerta
		this._message.subscribe((message) => (this.errorMessage = message));
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
      return;
    } 
    let registered = false;
    this.registeredIds.forEach((element: RegisteredStudent) => {
      if(element.studentId == this.studentId) {
        if(element.courseId == this.currentCourse.id) {
          registered = true;
        }
      }
    });
    if(registered) {
      this._message.next(`Este alumno ya ha sido registrado`);
    } else {
      this.entriesService.registerStudentEntry({}).subscribe(
        (res) => {
          // TODO: Check if correct status
        },
        (err) => {
          console.log(err);
        }
      );
      this.registeredIds.push({
        courseId: this.currentCourse.id,
        studentId: this.studentId
      });
      localStorage.setItem('registeredIds', JSON.stringify(this.registeredIds));
      this.studentId = '';
    }
  }
}
