import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatabaseComponent } from './components/database/database.component';
import { FileUploadComponent } from './components/database/file-upload/file-upload.component';
import { UsersComponent } from './components/database/users/users.component';
import { CourseEntriesComponent } from './components/entries/course-entries/course-entries.component';
import { EntriesComponent } from './components/entries/entries.component';
import { StudentEntriesComponent } from './components/entries/student-entries/student-entries.component';
import { LoginComponent } from './components/login/login.component';
import { ProfessorReportsComponent } from './components/reports/professor-reports/professor-reports.component';
import { ReportsComponent } from './components/reports/reports.component';
import { StudentReportsComponent } from './components/reports/student-reports/student-reports.component';
import { MainComponent } from './layout/main/main.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '', component: MainComponent, children: [
    { path: 'entries', component: EntriesComponent, children: [
      { path: 'course-entries', component: CourseEntriesComponent },
      { path: 'student-entries', component: StudentEntriesComponent }
    ] },
    { path: 'reports', component: ReportsComponent, children: [
      { path: 'student-reports', component: StudentReportsComponent },
      { path: 'professor-reports', component: ProfessorReportsComponent }
    ] },
    { path: 'database', component: DatabaseComponent, children: [
      { path: 'file-upload', component: FileUploadComponent },
      { path: 'users', component: UsersComponent }
    ] },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
