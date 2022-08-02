import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { project } from './project';

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
    let params = {
      projectId,
      resourceId,
    };
    return this.http
      .post(`${this.url}/addResourceToProject`, null, {
        headers,
        params,
        responseType: 'text',
      })
      .pipe(map((res) => JSON.parse(res)));
  }

  public deleteResourceFromProject(projectId: number, resourceId: number) {
    let headers = this.getHttpHeader();
    let params = {
      projectId,
      resourceId,
    };

    return this.http.post(`${this.url}/deleteResource`, null, {
      headers,
      params,
      responseType: 'text',
    });
  }

  public addTemplate(
    projectId: number,
    columnName: string,
    columnType: string,
    formula: string
  ) {
    let headers = this.getHttpHeader();
    let params = {
      projectId,
      columnName,
      columnType,
      formula,
    };
    return this.http
      .post(`${this.url}/addTemplate`, null, {
        headers,
        params,
        responseType: 'text',
      })
      .pipe(map((res) => JSON.parse(res)));
  }

  public setEntry(resourceId: number, columnId: number, value: string) {
    let headers = this.getHttpHeader();
    let params = {
      resourceId,
      columnId,
      value,
    };
    return this.http
      .post(`${this.url}/setEntry`, null, {
        headers,
        params,
        responseType: 'text',
      })
      .pipe(map((res) => JSON.parse(res)));
  }
}
