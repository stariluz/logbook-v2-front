import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  getLabs(): Observable<any> {
    return this.http.get('assets/data/labData.json');
  }

  getStudentReport(obj: Object): Observable<any> {
    return this.http.get('assets/data/studentsRegistryData.json');
  }

  getProfessorReport(obj: Object): Observable<any> {
    return this.http.get('assets/data/professorsRegistryData.json');
  }
}
