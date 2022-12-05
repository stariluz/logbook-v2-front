import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any> {
    return this.http.get('assets/data/courseData.json');
  }

  getProfessors(): Observable<any> {
    return this.http.get('assets/data/professorData.json');
  }
}