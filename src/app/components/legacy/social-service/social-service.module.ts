// Modulos
import { NgModule } from '@angular/core';
// import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

// Secciones
import { MainPageComponent } from './main-page/main-page.component';

// Servicios
import { DatabaseService } from 'src/app/services/database.service';
import { SsEntriesComponent } from './ss-entries/ss-entries.component';

@NgModule({
  declarations: [
    MainPageComponent,
    SsEntriesComponent
  ],
  exports: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbAlertModule,
    // ZXingScannerModule,
    TableModule
  ],
  providers: [
    DatabaseService
  ]
})
export class SocialServiceModule { }
