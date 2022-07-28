import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarValue: boolean = false;
  constructor() {}

  sendUpdate(value: boolean) {
    this.sidebarValue = value;
  }

  getUpdate() {
    return this.sidebarValue;
  }
}
