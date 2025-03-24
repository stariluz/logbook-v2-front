import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { EntriesService } from 'src/app/services/entries.service';

// Tipado de objetos para la busqueda en el elemento dropdown
type Professor = { id: string; name: string }
type Course = { id: string; name: string; group: string; professor: Professor };

@Component({
  standalone: false,
  selector: 'app-open-students-group',
  templateUrl: './open-students-group.component.html',
  styleUrls: ['./open-students-group.component.css']
})
export class OpenStudentsGroupComponent {
  public selectedCourse?: Course;
  public courses: Course[] = [];
  public filteredCourses: Course[] = [];
  private user: any;
  private labs: any[] = []; // @todo Type model
  public selectedLab?: string;
  // Referencia a la alerta
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert?: NgbAlert;
  private _message = new Subject<string>();
  errorMessage: string = '';

  constructor(private router: Router, private entriesService: EntriesService, private databaseService:DatabaseService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
    if (this.user.user.lab) {
      this.selectedLab = this.user.user.lab;
    }
    if(!this.selectedLab){
      this.databaseService.getLabs().subscribe({
        next: (labs:any)=>{
          this.labs=labs;
        },
        error: (error:any)=>{
          /* @dev remove showing error directly*/
          console.error("DEV - ",error)
        }
  
      })
    }else{
      // Obtiene los cursos/clases por medio de una petición
      this.entriesService.getCoursesByLab(this.selectedLab).subscribe(
        (res) => {
          this.courses = res;
        },
        (err) => {
          console.log(err);
        }
      );
    }
    
    /**
     * @todo
     * The alerts should be a service and not be using local vaiables all the time
     */
    this._message.subscribe((message) => (this.errorMessage = message));
    this._message.pipe(debounceTime(4000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  // Filtra los cursos según lo ingresado por el usuario
  filterCourse(event: any) {
    let query = event.query;

    this.filteredCourses= this.courses.filter((course)=>{
      return course.name.toLowerCase().includes(query.toLowerCase())
    })
  }

  // Revisión que los datos se hayan ingresado correctamente, para posteriormente guardar el objeto en el almacenamiento local
  registerClassEntry() {
    if (!this.selectedCourse) {
      this._message.next(`Porfavor seleccione una clase`);
    } else {
      localStorage.setItem('currentCourse', JSON.stringify(this.selectedCourse));
      this.router.navigateByUrl('/entries/student-entries');
    }
  }
}
