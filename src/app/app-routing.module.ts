import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatabaseComponent } from './components/legacy/database/database.component';
import { FileUploadComponent } from './components/legacy/database/file-upload/file-upload.component';
import { UsersComponent } from './components/legacy/database/users/users.component';
import { CourseEntriesComponent } from './components/legacy/entries/course-entries/course-entries.component';
import { CustomCourseEntriesComponent } from './components/legacy/entries/custom-course-entries/custom-course-entries.component';
import { EntriesComponent } from './components/legacy/entries/entries.component';
import { StudentEntriesComponent } from './components/legacy/entries/student-entries/student-entries.component';
import { InventoryComponent } from './components/legacy/inventory/inventory.component';
import { LoginComponent } from './components/legacy/login/login.component';
import { ProfessorReportsComponent } from './components/legacy/reports/professor-reports/professor-reports.component';
import { ReportsComponent } from './components/legacy/reports/reports.component';
import { StudentReportsComponent } from './components/legacy/reports/student-reports/student-reports.component';
import { MainComponent } from './layout/main/main.component';
import { AuthGuard } from './services/auth.guard';
import { RoleGuard } from './services/role.guard';
import { MainPageComponent } from './components/legacy/social-service/main-page/main-page.component';
import { SocialServiceReportsComponent } from './components/legacy/reports/social-service-reports/social-service-reports.component';
import { AssistanshipsReportsComponent } from './components/legacy/reports/assistanships-reports/assistanships-reports.component';
import { AssistanshipsMainPageComponent } from './components/legacy/assistanships/as-main-page/as-main-page.component';
import { RecordsStudentsEntriesComponent } from './components/records/records-students-entries/records-students-entries.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '', component: MainComponent, children: [
      {
        path: 'entries', component: RecordsStudentsEntriesComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['auxiliar', 'superuser'] }
      },
      // {
      //   path: '/entries', component: EntriesComponent, canActivate: [AuthGuard, RoleGuard], children: [
      //     { path: 'course-entries', component: CourseEntriesComponent },
      //     { path: 'custom-course-entries', component: CustomCourseEntriesComponent },
      //     { path: 'student-entries', component: StudentEntriesComponent }
      //   ], data: {
      //     roles: ['auxiliar', 'superuser']
      //   }
      // },
      {
        path: 'reports', component: ReportsComponent, canActivate: [AuthGuard, RoleGuard], children: [
          { path: 'student-reports', component: StudentReportsComponent },
          { path: 'professor-reports', component: ProfessorReportsComponent },
          { path: 'social-service-reports', component: SocialServiceReportsComponent },
          { path: 'assistanships-reports', component: AssistanshipsReportsComponent }
        ], data: { roles: ['admin', 'superuser'] }
      },
      {
        path: 'database', component: DatabaseComponent, canActivate: [AuthGuard, RoleGuard], children: [
          { path: 'file-upload', component: FileUploadComponent },
          { path: 'users', component: UsersComponent }
        ], data: { roles: ['superuser'] }
      },
      { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['admin', 'superuser'] } },
      { path: 'social-service', component: MainPageComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['auxiliar', 'superuser'] } },
      { path: 'assistanships', component: AssistanshipsMainPageComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['auxiliar', 'superuser'] } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
