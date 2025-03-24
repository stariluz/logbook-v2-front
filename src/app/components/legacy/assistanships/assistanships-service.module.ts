// Modulos
import { NgModule } from '@angular/core';
// import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

// Secciones
import { AssistanshipsMainPageComponent } from './as-main-page/as-main-page.component';

// Servicios
import { DatabaseService } from 'src/app/services/database.service';
import { AsEntriesComponent } from './as-entries/as-entries.component';

@NgModule({
  declarations: [
    AssistanshipsMainPageComponent,
    AsEntriesComponent
  ],
  exports: [
    AssistanshipsMainPageComponent
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
export class AssistanshipsModule { }
