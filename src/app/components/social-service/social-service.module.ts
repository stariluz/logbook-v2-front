import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';

// Servicios
import { DatabaseService } from 'src/app/services/database.service';



@NgModule({
  declarations: [
    MainPageComponent
  ],
  exports: [
    MainPageComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    DatabaseService
  ]
})
export class SocialServiceModule { }
