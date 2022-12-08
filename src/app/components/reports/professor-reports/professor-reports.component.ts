import { Component, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map, Observable, OperatorFunction, Subject } from 'rxjs';
import { EntriesService } from 'src/app/services/entries.service';
import { ReportsService } from 'src/app/services/reports.service';

// Tipado de objetos para la busqueda en el elemento dropdown
type Lab = { id: string; name: string }
type Professor = { id: string; name: string }
type Course = { id: string; name: string; professor: Professor};
type ProfessorRegistry = { id: string; name: string; date: Date; course: string; lab: string }

@Component({
  selector: 'app-professor-reports',
  templateUrl: './professor-reports.component.html',
  styleUrls: ['./professor-reports.component.css', './professor-reports.component.scss']
})
export class ProfessorReportsComponent {

  // Formato del texto que se presenta al seleccionar un elemento del dropdown
  labFormatter = (lab: Lab) => lab.name;
  courseFormatter = (course: Course) => `${course.name}  -  ${course.id}`;

  public selectedLab?: Lab;
  public selectedCourse?: Course;
  private labs: Lab[] = [];
  private courses: Course[] = [];
  public rangeDates: Date[] = [];
  public professorReports: ProfessorRegistry[] = [];

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert?: NgbAlert;
  private _message = new Subject<string>();
  errorMessage: string = '';

  constructor(private reportsService: ReportsService, private entriesService: EntriesService) { }

  ngOnInit(): void {
    // Obtiene los laboratorios por medio de una petición
    this.reportsService.getLabs().subscribe(
      (res) => {
        this.labs = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
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

  // Busqueda de los laboratorios dentro del objeto recibido despues de realizar la petición
  searchLabs: OperatorFunction<string, readonly { id: string; name: string }[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			filter((term) => term.length >= 1),
			map((term) => this.labs.filter((lab) => new RegExp(term, 'mi').test(lab.name)).slice(0, 10)),
		);

  // Busqueda de los cursos/clases dentro del objeto recibido despues de realizar la petición
  searchCourses: OperatorFunction<string, readonly { id: string; name: string, professor: Professor }[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			filter((term) => term.length >= 1),
			map((term) => this.courses.filter((course) => new RegExp(term, 'mi').test(course.name)).slice(0, 10)),
		);

  // Obtiene los reportes de los estudiantes segun los filtros proporcionados
  getProfessorReports() {
    if(!this.selectedLab && !this.selectedCourse) {
      this._message.next(`Porfavor seleccione por lo menos un campo incluyendo el rango de fechas`);
    } else if(this.rangeDates.length == 0) {
      this._message.next(`Porfavor seleccione una fecha o rango de fechas`);
    } else {
      this.reportsService.getProfessorReport({}).subscribe(
        (res) => {
          this.professorReports = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
