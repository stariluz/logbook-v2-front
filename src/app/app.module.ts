import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EntriesComponent } from './components/entries/entries.component';
import { MainComponent } from './layout/main/main.component';
import { HeaderComponent } from './layout/main/header/header.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { NgbAlertModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { StudentEntriesComponent } from './components/entries/student-entries/student-entries.component';
import { CourseEntriesComponent } from './components/entries/course-entries/course-entries.component';

@NgModule({
  declarations: [
    AppComponent,
    EntriesComponent,
    MainComponent,
    HeaderComponent,
    StudentEntriesComponent,
    CourseEntriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AutoCompleteModule,
    NgbTypeaheadModule,
    NgbAlertModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

