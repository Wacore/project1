import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private url = 'http://localhost:8080/Kotera/project';
  private projectData: any = {};
  public projectList: project[] = [
    { id: 29, name: 'project 1' },
    { id: 53, name: 'project 2' },
  ];

  constructor(private http: HttpClient) {}

  private getHttpHeader() {
    let headers = new HttpHeaders();
    return headers.append(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
  }

  public getProject(projectId: number) {
    let headers = this.getHttpHeader();
    let queryParams = new HttpParams().append('projectId', projectId);
    return this.http
      .get(`${this.url}/read`, {
        headers,
        params: queryParams,
        responseType: 'text',
      })
      .pipe(map((res) => JSON.parse(res)));
  }

  public postResourceToProject(projectId: number, resourceId: number) {
    let headers = this.getHttpHeader();
    let params = new HttpParams().appendAll({ projectId, resourceId });
    this.http
      .post(`${this.url}/addResourceToProject`, null, {
        headers,
        params,
        responseType: 'text',
      })
      .pipe(map((res) => JSON.parse(res)));
  }
}

export interface project {
  id: number;
  name: string;
}
