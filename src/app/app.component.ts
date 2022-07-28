import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public authService: UserService) {}
  public isSideBarOpen: boolean = false;

  toggleSideBarHandler(value: boolean) {
    console.log(value);
    this.isSideBarOpen = value;
  }
}
