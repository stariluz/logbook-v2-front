import { Component } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

	entriesRouter: String = '';

  constructor(private offcanvasService: NgbOffcanvas) {}
  
  open(content: any) {
	let currentCourse = localStorage.getItem('currentCourse');
	if(currentCourse) {
		this.entriesRouter = 'entries/student-entries';
	} else {
		this.entriesRouter = 'entries/course-entries';
	}
		this.offcanvasService.open(content);
	}
}
