import { group } from '@angular/animations';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
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
  styleUrls: ['./open-students-group.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OpenStudentsGroupComponent {

  private user: any;

  public selectedCourse?: Course;
  public courses: Course[] = [];

  public selectedLab?: string;
  public labs: any[] = []; // @todo Type model

  public selectedGroup?: string;
  public groups: any[] = []; // @todo Type model

  protected disableLabs: boolean = false;

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert?: NgbAlert;
  private _message = new Subject<string>();
  errorMessage: string = '';

  constructor(private router: Router, private entriesService: EntriesService, private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
    if (this.user.user.lab) {
      this.selectedLab = this.user.user.lab;
      this.disableLabs = true;
    }
    if (this.selectedLab) {
      this.entriesService.getCoursesByLab(this.selectedLab).subscribe({
        next: (courses: any) => {
          console.log(courses)
          /**
           * @todo Move group courses to backend
           */

          let coursesGroupedByName = courses.reduce(
            (accum: any,
              course: { name: string, group: any, professor: any }) => {
              return this.groupCourse(accum, course);
            });
          coursesGroupedByName=this.groupCourse(coursesGroupedByName, coursesGroupedByName);
          delete coursesGroupedByName._id;
          delete coursesGroupedByName.group;
          delete coursesGroupedByName.name;
          delete coursesGroupedByName.professor;

          console.log("DEV @stariluz - CoursesGrouped", coursesGroupedByName);

          this.courses = Object.values(coursesGroupedByName);
          console.log("DEV @stariluz - Courses", this.courses);
        },
        error: (error: any) => {
          /**
           * @todo remove showing error directly
           */
          console.error("DEV - ", error);
        }
      });
    } else {
      this.entriesService.getLabs().subscribe({
        next: (labs: any) => {
          /**
           * @todo Move filter labs to backend, or, clean labs registries removing classrooms numbers
           */

          this.labs = labs.filter((lab: { name: string | number }) => {
            return typeof lab.name == "string";
          }).map((lab: { name: string | number }) => {
            return lab.name;
          });
          // console.log("DEV @stariluz - Labs", this.labs);
        },
        error: (error: any) => {
          /**
           * @todo remove showing error directly
           */
          console.error("DEV - ", error);
        }
      });
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

  groupCourse(accum: any, course: any) {
    if (!accum[course.name]) {
      accum[course.name] = {
        name: course.name,
        groups: []
      };
    }
    accum[course.name].groups.push({
      group: course.group,
      professor: course.professor
    });
    return accum;
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

  debugSelectedLab() {
    console.log("DEV @stariluz - SelectedLab", this.selectedLab);
  }
}
