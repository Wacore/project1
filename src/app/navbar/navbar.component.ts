import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isUserInfoOpen: boolean = false;
  public currentUser: UserInfo;
  constructor(public authService: UserService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  toggleUserInfo() {
    this.isUserInfoOpen = !this.isUserInfoOpen;
  }

  signOut() {
    localStorage.removeItem('token');
  }
}
