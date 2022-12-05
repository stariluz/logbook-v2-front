import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseEntriesComponent } from './components/entries/course-entries/course-entries.component';
import { EntriesComponent } from './components/entries/entries.component';
import { MainComponent } from './layout/main/main.component';

const routes: Routes = [
  { path: '', redirectTo: 'entries/course-entries', pathMatch: 'full' },
  { path: '', component: MainComponent, children: [
    { path: 'entries', component: EntriesComponent, children: [
      { path: 'course-entries', component: CourseEntriesComponent },
    ] },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
