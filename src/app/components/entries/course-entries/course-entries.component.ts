import { Component, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map, Observable, OperatorFunction, Subject } from 'rxjs';
import { EntriesService } from 'src/app/services/entries.service';

type Course = { id: string; name: string};
type Professor = { id: string; name: string};

@Component({
  selector: 'app-course-entries',
  templateUrl: './course-entries.component.html',
  styleUrls: ['./course-entries.component.css']
})

export class CourseEntriesComponent {
  
  courseFormatter = (course: Course) => course.name;
  professorFormatter = (professor: Professor) => professor.name;

  public selectedCourse?: Course;
  public selectedProfessor?: Professor;
  private _courses: Course[] = [];
  private _professors: Professor[] = [];

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert?: NgbAlert;
  private _message = new Subject<string>();
  errorMessage: string = '';

  constructor(private entriesService: EntriesService) { }

  ngOnInit(): void {
    this.entriesService.getCourses().subscribe(
      (res) => {
        this._courses = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
    this.entriesService.getProfessors().subscribe(
      (res) => {
        this._professors = res.data;
      },
      (err) => {
        console.log(err);
      }
    );

		this._message.subscribe((message) => (this.errorMessage = message));
		this._message.pipe(debounceTime(5000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
  }

  searchCourses: OperatorFunction<string, readonly { id: string; name: string }[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			filter((term) => term.length >= 1),
			map((term) => this._courses.filter((course) => new RegExp(term, 'mi').test(course.name)).slice(0, 10)),
		);
  
  searchProfessors: OperatorFunction<string, readonly { id: string; name: string }[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			filter((term) => term.length >= 1),
			map((term) => this._professors.filter((professor) => new RegExp(term, 'mi').test(professor.name)).slice(0, 10)),
		);

  registerClassEntry() {
    if(!this.selectedCourse && !this.selectedProfessor) {
      this._message.next(`- Message successfully changed.`);
    }
  }
}
