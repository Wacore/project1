import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private url = 'http://localhost:8080/Kotera/resource';
  private columnInfo = new BehaviorSubject<any[]>([]);
  private tableDetail = new BehaviorSubject<any[]>([]);
  currentColumn = this.columnInfo.asObservable();
  currentTableDetail = this.tableDetail.asObservable();
  data: any = [];

  // private resourceData: any = {
  //   columnInfo: [
  //     { columnName: 'resource code', id: 21, type: null, formula: null },
  //     { columnName: 'resource name', id: 20, type: null, formula: null },
  //     { columnName: 'resource code', id: 21, type: null, formula: null },
  //     { columnName: 'resource name', id: 20, type: null, formula: null },
  //   ],
  //   tableDetail: [
  //     { resourceId: 22, content: { 21: '050000', 20: 'Metals' } },
  //     { resourceId: 23, content: { 21: '040000', 20: 'Masonry' } },
  //   ],
  // };

  constructor(private http: HttpClient) {}

  uniqueColumnInfo(col: any[]) {
    const uniqueIds = new Set();

    return col.filter((c) => {
      const isDuplicate = uniqueIds.has(c.id);

      uniqueIds.add(c.id);

      if (!isDuplicate) {
        return true;
      }

      return false;
    });
  }

  // getData() {
  //   this.resourceData.columnInfo = this.uniqueColumnInfo(
  //     this.resourceData.columnInfo
  //   );
  //   return this.resourceData;
  // }

  private getToken() {
    return localStorage.getItem('token');
  }

  private getHttpHeader() {
    let headers = new HttpHeaders();
    return headers.append('Authorization', `Bearer ${this.getToken()}`);
  }

  public getResourceData(): Observable<any> {
    let headers = this.getHttpHeader();
    return this.http
      .get(`${this.url}/read`, { headers, responseType: 'text' })
      .pipe(map((res) => JSON.parse(res)));
  }

  public updateColumnInfo(array: any[]) {
    this.columnInfo.next(array);
    console.log(this);
  }

  public updateTableDetail(array: any[]) {
    this.tableDetail.next(array);
  }

  public postResource() {
    let headers = this.getHttpHeader();
    return this.http
      .post(`${this.url}/addResource`, null, {
        headers,
        responseType: 'text',
      })
      .pipe(map((res) => JSON.parse(res)));
  }

  public deleteResource(resourceId: number) {
    let headers = this.getHttpHeader();
    let queryParams = new HttpParams();
    queryParams = queryParams.append('resourceId', resourceId);
    return this.http.post(`${this.url}/deleteResource`, null, {
      headers,
      params: queryParams,
      responseType: 'text',
    });
  }

  public setEntry(resourceId: number, columnId: number, value: string) {
    let headers = this.getHttpHeader();
    let queryParams = {
      resourceId,
      columnId,
      value,
    };
    return this.http
      .post(`${this.url}/setEntry`, null, {
        headers,
        params: queryParams,
        responseType: 'text',
      })
      .pipe(map((res) => JSON.parse(res)));
  }
}
