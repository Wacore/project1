import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css'],
})
export class SideNavbarComponent implements OnInit {
  public routes = [
    { name: 'Resource', link: '/' },
    { name: 'Project', link: '/project' },
    { name: 'Formula', link: '/formula' },
  ];
  @Input() isSideBarOpen: boolean = false;
  @Output() toggleSideBarEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  toggleSideBar() {
    this.isSideBarOpen = !this.isSideBarOpen;
    this.toggleSideBarEvent.emit(this.isSideBarOpen);
  }
}
