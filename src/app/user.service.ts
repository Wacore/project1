import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserInfo } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:8080/Kotera/users';
  currentUser: UserInfo;

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.url}/login`, credentials, {
      responseType: 'text',
    });
  }

  register(credentials: any): Observable<any> {
    return this.http.post(`${this.url}/register`, credentials);
  }

  setCurrentUser() {
    let jwt = new JwtHelperService();
    this.currentUser = jwt.decodeToken(
      localStorage.getItem('token')?.toString()
    );
  }

  getCurrentUser() {
    let jwt = new JwtHelperService();
    return jwt.decodeToken(localStorage.getItem('token')?.toString());
  }

  isLoggedIn() {
    let jwt = new JwtHelperService();
    const token = localStorage.getItem('token');

    if (!token) return false;

    return !jwt.isTokenExpired(token);
  }
}
