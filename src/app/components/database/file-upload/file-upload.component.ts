import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css', './file-upload.component.scss']
})
export class FileUploadComponent {

  uploadedFile: any;
  workbook: any;
  binaryData: any;
  studentsSheetName: String = 'Alumnos';
  schedulesSheetName: String = 'Horarios';

  constructor(private databaseService: DatabaseService) { }

  onUpload(event: any, fileUpload: any) {
    const fileReader = new FileReader();
    this.uploadedFile = event.files[0];
    fileReader.readAsBinaryString(this.uploadedFile);
    
    fileReader.onload = (event: any) => {
      this.binaryData = event.target.result;
      this.workbook = XLSX.read(this.binaryData, {type: 'binary'});

      this.workbook.SheetNames.forEach((sheet: any) => {
        const data = XLSX.utils.sheet_to_json(this.workbook.Sheets[sheet]);
        // Mandamos un diferente formato para el objeto JSON dependiendo de la hoja
        this.databaseService.uploadFile(data, sheet)
            .subscribe((res) => {
              if(res.status == 200) {
                // TODO: Check if return status correct
              } else {
                // ...
              }
            });
      });
    };
    fileUpload.clear();
    fileUpload.uploadedFileCount = 0;
  }
}
