import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map, Observable, OperatorFunction, Subject } from 'rxjs';
import { EntriesService } from 'src/app/services/entries.service';
import { EntriesComponent } from '../entries.component';

// Tipado de objetos para la busqueda en el elemento dropdown
type Professor = { id: string; name: string }
type Course = { id: string; name: string; professor: Professor};

@Component({
  selector: 'app-course-entries',
  templateUrl: './course-entries.component.html',
  styleUrls: ['./course-entries.component.css']
})

export class CourseEntriesComponent {
  
  // Formato del texto que se presenta al seleccionar un elemento del dropdown
  courseFormatter = (course: Course) => `${course.name}  -  ${course.id}`;

  public selectedCourse?: Course;
  private courses: Course[] = [];

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert?: NgbAlert;
  private _message = new Subject<string>();
  errorMessage: string = '';

  constructor(private router: Router, private entriesService: EntriesService) { }

  ngOnInit(): void {
    // Obtiene los cursos/clases por medio de una petición
    this.entriesService.getCourses().subscribe(
      (res) => {
        this.courses = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
    // Tiempo de duración y mensaje de la alerta
		this._message.subscribe((message) => (this.errorMessage = message));
		this._message.pipe(debounceTime(4000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
  }

  // Busqueda de los cursos/clases dentro del objeto recibido despues de realizar la petición
  searchCourses: OperatorFunction<string, readonly { id: string; name: string, professor: Professor }[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			filter((term) => term.length >= 1),
			map((term) => this.courses.filter((course) => new RegExp(term, 'mi').test(course.name)).slice(0, 10)),
		);
  
  // Revisión que los datos se hayan ingresado correctamente, para posteriormente guardar el objeto en el almacenamiento local
  registerClassEntry() {
    if(!this.selectedCourse) {
      this._message.next(`Porfavor seleccione una clase`);
    } else {
      localStorage.setItem('currentCourse', JSON.stringify(this.selectedCourse));
      this.router.navigateByUrl('/entries/student-entries');
    }
  }
}
