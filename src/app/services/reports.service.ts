import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  getLabs(): Observable<any> {
    return this.http.get<any>('api/courses/current-labs/list');
  }

  getStudentReport(reportParams: any): Observable<any> {
    return this.http.get<any>('api/entries/students/reports', { params: reportParams });
  }

  getProfessorReport(reportParams: any): Observable<any> {
    return this.http.get<any>('api/entries/professors/reports', { params: reportParams });
  }

  getSSReport(reportParams: any): Observable<any> {
    return this.http.get<any>('api/ss/reports', { params: reportParams });
  }
}
