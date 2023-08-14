import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  constructor(private http: HttpClient) { }

  getCourse(id: string): Observable<any> {
    return this.http.get<any>(`api/courses/${id}`);
  }

  getCourses(): Observable<any> {
    return this.http.get<any>('api/courses');
  }

  getCoursesByLab(lab: string): Observable<any> {
    return this.http.get<any>(`api/courses/labs/${lab}`);
  }

  addCourse(course: any): Observable<any> {
    return this.http.post<any>('api/courses', course);
  }

  registerStudentEntry(obj: any): Observable<any> {
    return this.http.post<any>('api/entries', obj);
  }

  deleteStudentEntry(id: string): Observable<any> {
    return this.http.delete<any>(`api/entries/${id}`);
  }
}