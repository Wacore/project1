
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {
  public routes = [
    { name: 'Resource', link: '#' },
    { name: 'Project', link: '#' },
    { name: 'Formula', link: '#' }
  ]
  @Input() isSideBarOpen: boolean = false;
  @Output() toggleSideBarEvent = new EventEmitter();


  constructor() {
  }


  ngOnInit(): void {
    console.log(this.isSideBarOpen);
  }

  toggleSideBar() {
    this.isSideBarOpen = !this.isSideBarOpen;
    this.toggleSideBarEvent.emit(this.isSideBarOpen);
  }

}
