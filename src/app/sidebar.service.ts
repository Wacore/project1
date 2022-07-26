import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebar = new Subject<any>();
  constructor() { }

  sendUpdate(value: boolean) {
    this.sidebar.next({ status: value })
  }

  getUpdate(): Observable<any> {
    return this.sidebar.asObservable();
  }
}
