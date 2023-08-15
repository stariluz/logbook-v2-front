import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map, Observable, OperatorFunction, Subject } from 'rxjs';
import { EntriesService } from 'src/app/services/entries.service';
import { ReportsService } from 'src/app/services/reports.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { AssetsService } from 'src/app/services/assets.service';
import { SelectItem } from 'primeng/api';

// Tipado de objetos para la busqueda en el elemento dropdown
type Professor = { id: string; name: string }
type Course = { code: string; name: string; group: string; professor: Professor};
type StudentRegistry = { _id: string; studentId: string; name: string; start_time: Date; end_time: string; lab: string; hours: number; }
type AlertMessage = { message: string; type: string }

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-social-service-reports',
  templateUrl: './social-service-reports.component.html',
  styleUrls: ['./social-service-reports.component.css', './social-service-reports.component.scss']
})
export class SocialServiceReportsComponent {
  public studentId?: string;
  public selectedLab?: string;
  public selectedCourse?: Course;
  private labs: string[] = [];
  private courses: Course[] = [];
  public filteredLabs: string[] = [];
  public filteredCourses: Course[] = [];
  public studentReports: StudentRegistry[] = [];
  reports: any[] = [];
  private user: any;
  selectedDate: Date = new Date();
  selectedTabIndex: number = 0;
  monthOptions: SelectItem[] = [
      { label: 'Un solo mes', value: 'single' },
      { label: 'Rango de meses', value: 'range' }
  ];
  start_Range: Date = new Date();
  end_Range: Date = new Date();

  // Blob de las imagenes para los reportes
  private uachLogoBlob: any;
  private fingLogoBlob: any;
  private reportSheetBlob: any;

  private _message = new Subject<string>();
  alertMessage: AlertMessage = {
    message: '',
    type: ''
  };

  // Referencia a la alerta
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert?: NgbAlert;
  errorMessage: string = '';

  constructor(@Inject(LOCALE_ID) 
    private locale: string, 
    private assetsService: AssetsService, 
    private reportsService: ReportsService, 
    private entriesService: EntriesService) {
    (pdfMake as any).fonts = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
      }
    };
    this.loadImages();
  }

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
  getSSReports() {
    // Individual
    const year = this.selectedDate.getFullYear();
    const month = this.selectedDate.getMonth();

    // Rango
    const start_year = this.start_Range.getFullYear();
    const start_month = this.start_Range.getMonth();
    const end_year = this.end_Range.getFullYear();
    const end_month = this.end_Range.getMonth();

    // Dependiando de la pestaña seleccionada, se obtienen los parametros
    const parameters = {
      lab: this.selectedLab,
      student: this.studentId,
      startDate: this.selectedTabIndex == 0 ? new Date(year, month, 1) : new Date(start_year, start_month, 1),
      endDate: this.selectedTabIndex == 0 ? new Date(year, month + 1, 1) : new Date(end_year, end_month + 1, 1),
    };
    
    this.reportsService.getSSReport(parameters).subscribe(
      (res) => {
        this.studentReports = res;

        // Set the hour made by every student
        this.reports = this.getHoursPerMouth(this.studentReports);
        
        // Ejecutar el proceso en los elementos sin end_time
        for (let index = 0; index < this.studentReports.length; index++) {
          const student = this.studentReports[index];
          
          if (!student.end_time) {
            this.updateStudentReport(index, student);
          }
        }

        if (this.studentReports.length == 0) {
          this._message.next(`No se encontraron registros para los filtros proporcionados`);
          this.alertMessage.type = 'danger';
        }
      },
      (err) => {
        console.log(err);
      }
    )
  }
  
  updateStudentReport(index: number, student: any) {
    let start: Date = new Date(student.start_time);
        
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (start < today) {      
      this.studentReports[index].end_time = '';
      this.studentReports[index].hours = 0;

      this.entriesService.updateSSEntry(student._id, student).subscribe(
        (res) => {
          this.studentReports = [...this.studentReports];
          localStorage.setItem('SS-register', JSON.stringify(this.studentReports));
        },
        (err) => {
          console.log("Enserio");
          console.log(err);
        }
      );
    }
    
  }

  getHoursPerMouth(reports: any[]) {
    let result: any[] = [];
  
    // Crear un objeto para almacenar las horas por student.Id
    const hoursPerStudent: { [key: number]: number } = {};
    
    reports.forEach((item: any) => {
      const studentId = item.student._id;
      const hours = item.hours;
  
      if (hoursPerStudent[studentId]) {
        hoursPerStudent[studentId] += hours;
      } else {
        hoursPerStudent[studentId] = hours;
      }
    });

    let index = 0;
    // Convertir el objeto de horas por student.Id a un arreglo de objetos
    for (const studentId in hoursPerStudent) {
      index = reports.findIndex((item: any) => item.student._id === parseInt(studentId, 10));
      result.push([
        studentId,
        reports[index].student.name, 
        reports[index].lab,
        Math.floor(hoursPerStudent[studentId])
      ]);
    }
    return result;
  }  
  
  // Genera el PDF con la información del reporte
  generatePdfReport() {
    // Set month names
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    // Configuración del documento
    const docDefinition: any = {
      pageSize: 'LETTER',
      pageMargins: [40, 170, 40, 80],
      background: (currentPage: number, pageSize: any) => {
        return [
          {
            image: this.reportSheetBlob,
            height: pageSize.height,
            width: pageSize.width,
          },
          { text: 'Bitácora Mensual de Servicio Social', style: 'header', absolutePosition: { x: 200, y: 48 }, alignment: 'start' },
          { text: `Laboratorio: ${this.user.user.lab}`, style: 'text', absolutePosition: { x: 200, y: 64 }, alignment: 'start' },
          { text: `Jefe de Laboratorio: ${this.user.user.name}`, style: 'text', absolutePosition: { x: 200, y: 77 }, alignment: 'start' },
          { text: 'Parámetros', style: 'text', absolutePosition: { x: 200, y: 100 }, bold: true, alignment: 'start' },
          { text: this.selectedLab ? `Laboratorio: ${this.selectedLab}` : 'Todos los laboratorios', style: 'text', absolutePosition: { x: 200, y: 113 }, alignment: 'start' },
          { text: this.studentId ? `Alumno: ${this.studentId}` : 'Todos los alumnos', style: 'text', absolutePosition: { x: 200, y: 126 }, alignment: 'start' },
          { text: `Mes de ${months[this.selectedDate.getMonth()]}`, style: 'text', absolutePosition: { x: 200, y: 139 }, alignment: 'start' },
          {
            image: this.fingLogoBlob,
            height: 90,
            width: 90,
            absolutePosition: { x: pageSize.width - 120, y: 45 },
          }
        ];
      },
      content: [
        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto'],
            body: [
              [{ text: 'Matrícula', style: 'tableHeader' }, { text: 'Nombre', style: 'tableHeader' }, { text: 'Laboratorio', style: 'tableHeader' }, { text: 'Horas realizadas', style: 'tableHeader' }],
              ...this.reports
            ]
          }
        }
      ],
      defaultStyle: {
        fontSize: 11,
        alignment: 'start',
        color: '#444444',
      },
      styles: {
        header: {
          bold: true,
          fontSize: 12,
          color: 'black',
          alignment: 'center',
        },
        tableHeader: {
          color: 'black',
        },
        text: {
          alignment: 'center',
        }
      },
    };
    // Creamos el PDF
    const pdf = pdfMake.createPdf(docDefinition);
    pdf.open();
    this.getSSReports()
  }

  // Convertimos las imagenes que utilizaremos en blobs
  async loadImages() {
    this.uachLogoBlob = await this.assetsService.getAssetAsBlob('assets/images/uach_logo.png');
    this.fingLogoBlob = await this.assetsService.getAssetAsBlob('assets/images/fing_logo.png');
    this.reportSheetBlob = await this.assetsService.getAssetAsBlob('assets/images/report_sheet.png');
  }
}
