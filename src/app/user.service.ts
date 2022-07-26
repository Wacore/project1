import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, concatAll } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'localhost:8080/Kotera/users';
  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http.get(`${this.url}/login`, credentials);
  }

  signup(credentials: any) {}
}
