import { Component, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map, Observable, OperatorFunction, Subject } from 'rxjs';
import { EntriesService } from 'src/app/services/entries.service';
import { ReportsService } from 'src/app/services/reports.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

// Tipado de objetos para la busqueda en el elemento dropdown
type Professor = { id: string; name: string }
type Course = { code: string; name: string; group: string; professor: Professor};
type StudentRegistry = { id: string; name: string; date: Date; course: string; lab: string }

@Component({
  selector: 'app-student-reports',
  templateUrl: './student-reports.component.html',
  styleUrls: ['./student-reports.component.css', './student-reports.component.scss']
})
export class StudentReportsComponent {

  public studentId?: string;
  public selectedLab?: string;
  public selectedCourse?: Course;
  private labs: string[] = [];
  private courses: Course[] = [];
  public filteredLabs: string[] = [];
  public filteredCourses: Course[] = [];
  public rangeDates: Date[] = [];
  public studentReports: StudentRegistry[] = [];
  private user: any;

  // Referencia a la alerta
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert?: NgbAlert;
  private _message = new Subject<string>();
  errorMessage: string = '';

  constructor(private reportsService: ReportsService, private entriesService: EntriesService) { }

  ngOnInit(): void {
    // Tomamos el usuario actual
    this.user = localStorage.getItem('user');
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
    // Obtiene los laboratorios por medio de una petición
    this.reportsService.getLabs().subscribe(
      (res) => {
        res.forEach((element: any) => {
          if (element.name) {
            this.labs.push(String(element.name));
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );
    // Obtiene los cursos/clases por medio de una petición
    this.entriesService.getCourses().subscribe(
      (res) => {
        this.courses = res;
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

  // Filtra los laboratorios según lo ingresado por el usuario
  filterLab(event: any) {
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.labs.length; i++) {
      let lab = this.labs[i];
      if (lab.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(lab);
      }
    }

    this.filteredLabs = filtered;
  }

  // Filtra los cursos según lo ingresado por el usuario
  filterCourse(event: any) {
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.courses.length; i++) {
      let course = this.courses[i];
      if (course.name.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(course);
      }
    }

    this.filteredCourses = filtered;
  }

  // Obtiene los reportes de los estudiantes segun los filtros proporcionados
  getStudentReports() {
    if(!this.selectedLab && !this.selectedCourse && !this.studentId) {
      this._message.next(`Porfavor seleccione por lo menos un campo incluyendo el rango de fechas`);
    } else if(this.rangeDates.length == 0) {
      this._message.next(`Porfavor seleccione una fecha o rango de fechas`);
    } else {
      const parameters = {
        lab: this.selectedLab,
        student: this.studentId,
        courseCode: this.selectedCourse?.code,
        courseGroup: this.selectedCourse?.group,
        startDate: this.rangeDates[0].toISOString(),
        endDate: this.rangeDates[1].toISOString()
      };
      this.reportsService.getStudentReport(parameters).subscribe(
        (res) => {
          this.studentReports = res;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  // Genera el PDF del reporte obtenido
  exportAsPDF() {
    let DATA: any = document.getElementById('reportTable');
    html2canvas(DATA).then((canvas) => {
      // Foto de la tabla
      let fileWidth = 190;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jspdf.jsPDF('p', 'mm', 'a4');
      let position = 30;
      PDF.addImage(FILEURI, 'PNG', 10, position, fileWidth, fileHeight);
      // Titulo de la tabla
      PDF.text("Reporte de entradas de estudiantes", 11, 15, { align: 'left' });
      // Fecha de generación del reporte
      PDF.setFontSize(9);
      PDF.text(`Fecha de creación: ${new Date().toLocaleString()}`, 11, 20, { align: 'left' });
      // Usuario que creo el reporte
      PDF.text(`Generado por: ${this.user.user.name}`, 11, 25, { align: 'left' });
      PDF.save('reporte-estudiantes.pdf');
    });
  }
}
