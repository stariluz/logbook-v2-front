import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { EntriesComponent } from './components/legacy/entries/entries.component';
import { MainComponent } from './layout/main/main.component';
import { HeaderComponent } from './layout/main/header/header.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { NgbAlertModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { StudentEntriesComponent } from './components/legacy/entries/student-entries/student-entries.component';
import { CourseEntriesComponent } from './components/legacy/entries/course-entries/course-entries.component';
// import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReportsComponent } from './components/legacy/reports/reports.component';
import { StudentReportsComponent } from './components/legacy/reports/student-reports/student-reports.component';
import { ProfessorReportsComponent } from './components/legacy/reports/professor-reports/professor-reports.component';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { DatabaseComponent } from './components/legacy/database/database.component';
import { FileUploadComponent } from './components/legacy/database/file-upload/file-upload.component';
import { UsersComponent } from './components/legacy/database/users/users.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { LoginComponent } from './components/legacy/login/login.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptor } from './services/token.interceptor';
import { RoleGuard } from './services/role.guard';
import { MessageService } from 'primeng/api';
import { CustomCourseEntriesComponent } from './components/legacy/entries/custom-course-entries/custom-course-entries.component';
import { InventoryComponent } from './components/legacy/inventory/inventory.component';
import { InventoryService } from './services/inventory.service';
import { SocialServiceModule } from './components/legacy/social-service/social-service.module';
import { SocialServiceReportsComponent } from './components/legacy/reports/social-service-reports/social-service-reports.component';
import { TabViewModule } from 'primeng/tabview';
import { AssistanshipsModule } from './components/legacy/assistanships/assistanships-service.module'
import { AssistanshipsReportsComponent } from './components/legacy/reports/assistanships-reports/assistanships-reports.component';
import { Navbar2025Component } from './layout/style-2025/navbar-2025/navbar-2025.component';
import { Navbar2025Module } from './layout/style-2025/navbar-2025/navbar-2025.module';
import { TrackByPropertyDirective } from './directives/track-by-property.directive';
import { RecordsSocialServiceComponent } from './components/records/records-social-service/records-social-service.component';
import { RecordsAssistantshipsComponent } from './components/records/records-assistantships/records-assistantships.component';
import { RecordsStudentsEntriesComponent } from './components/records/records-students-entries/records-students-entries.component';
import { DataUsersComponent } from './components/data/data-users/data-users.component';
import { DataFilesComponent } from './components/data/data-files/data-files.component';
import { DataInventoryComponent } from './components/data/data-inventory/data-inventory.component';
import { ReportsSocialServiceComponent } from './components/reports/reports-social-service/reports-social-service.component';
import { ReportsAssistantshipsComponent } from './components/reports/reports-assistantships/reports-assistantships.component';
import { ReportsStudentsComponent } from './components/reports/reports-students/reports-students.component';
import { ReportsTeachersComponent } from './components/reports/reports-teachers/reports-teachers.component';
import { Header2025Component } from './layout/style-2025/header-2025/header-2025.component';
import { TabBarComponent } from './layout/style-2025/tab-bar/tab-bar.component';
import { TabItemComponent } from './layout/style-2025/tab-bar/tab-item/tab-item.component';
import { TabActionComponent } from './layout/style-2025/tab-bar/tab-action/tab-action.component';
import { OpenStudentsGroupComponent } from './components/records/records-students-entries/open-students-group/open-students-group.component';
import { ButtonComponent } from './layout/style-2025/button/button.component';
import { InputAutocompleteComponent } from './layout/style-2025/input/input-autocomplete/input-autocomplete.component';
import { InputComponent } from './layout/style-2025/input/input.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';
import Aura from '@primeng/themes/aura';
import BlueLaraPreset from 'src/assets/BlueLaraPreset';

@NgModule({
  declarations: [
    AppComponent,
    EntriesComponent,
    MainComponent,
    HeaderComponent,
    StudentEntriesComponent,
    CourseEntriesComponent,
    ReportsComponent,
    StudentReportsComponent,
    ProfessorReportsComponent,
    DatabaseComponent,
    FileUploadComponent,
    UsersComponent,
    LoginComponent,
    CustomCourseEntriesComponent,
    InventoryComponent,
    SocialServiceReportsComponent,
    AssistanshipsReportsComponent,
    TrackByPropertyDirective,
    RecordsSocialServiceComponent,
    RecordsAssistantshipsComponent,
    RecordsStudentsEntriesComponent,
    ReportsSocialServiceComponent,
    ReportsAssistantshipsComponent,
    DataUsersComponent,
    DataFilesComponent,
    DataInventoryComponent,
    ReportsStudentsComponent,
    ReportsTeachersComponent,
    Header2025Component,
    TabBarComponent,
    TabItemComponent,
    TabActionComponent,
    OpenStudentsGroupComponent,
    ButtonComponent,
    InputAutocompleteComponent,
    InputComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AutoCompleteModule,
    NgbTypeaheadModule,
    NgbAlertModule,
    FormsModule,
    // ZXingScannerModule,
    CalendarModule,
    TableModule,
    FileUploadModule,
    OverlayPanelModule,
    DialogModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    SocialServiceModule,
    TabViewModule,
    AssistanshipsModule,
    Navbar2025Module
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    MessageService,
    InventoryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: BlueLaraPreset,
        options: {
          darkModeSelector: false,
        },
      }
    }),
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

