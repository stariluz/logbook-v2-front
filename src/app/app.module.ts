import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EntriesComponent } from './components/legacy/entries/entries.component';
import { MainComponent } from './layout/main/main.component';
import { HeaderComponent } from './layout/main/header/header.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { NgbAlertModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { StudentEntriesComponent } from './components/legacy/entries/student-entries/student-entries.component';
import { CourseEntriesComponent } from './components/legacy/entries/course-entries/course-entries.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
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
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AutoCompleteModule,
    NgbTypeaheadModule,
    NgbAlertModule,
    FormsModule,
    ZXingScannerModule,
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
    Navbar2025Module,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

