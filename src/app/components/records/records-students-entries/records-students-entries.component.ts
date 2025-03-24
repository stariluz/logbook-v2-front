import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ITabBar } from 'src/app/layout/style-2025/tab-bar/tab-bar.model';
import { EntriesService } from 'src/app/services/entries.service';

@Component({
  standalone: false,
  selector: 'app-records-students-entries',
  templateUrl: './records-students-entries.component.html',
  styleUrls: ['./records-students-entries.component.css']
})
export class RecordsStudentsEntriesComponent {
  tabBar: ITabBar = {
    tabs: [],
    actions: [
      {
        icon: "ti ti-plus",
        routerLink: ['.', 'open-group'],
      }
    ],
    activeTabIndex: 0
  };
  openCourses:any[]=[]
  ngOnInit(): void {
    // const openCourses = localStorage.getItem('openCourses');
    // if (openCourses) {
    //   this.openCourses = JSON.parse(openCourses);
    // }
  }
}
