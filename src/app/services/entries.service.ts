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

  registerSSEntry(obj: any): Observable<any> {
    return this.http.post<any>('api/ss', obj);
  }

  deleteSSEntry(id: string): Observable<any> {
    return this.http.delete<any>(`api/ss/${id}`);
  }

  updateSSEntry(id: string, student: any): Observable<any> {
    return this.http.patch<any>(`api/ss/${id}`, student);
  }

  getFaculties(): Observable<any> {
    return this.http.get<any>('api/faculties');
  }
}