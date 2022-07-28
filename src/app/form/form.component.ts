import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input('formTitle') formTitle: string;
  @Input('isLogin') isLogin: boolean;
  public invalidLogin: boolean;

  constructor(private authService: UserService, private router: Router) {}

  ngOnInit(): void {}

  submit(credentials: any) {
    const userObj = {
      username: credentials.username,
      password: credentials.password,
    };
    if (this.isLogin) {
      this.authService.login(userObj).subscribe((result) => {
        if (result) {
          localStorage.setItem('token', result);
          this.router.navigate(['/']);
          this.authService.setCurrentUser();
        } else {
          this.invalidLogin = true;
        }
      });
    } else {
      this.authService.register(userObj).subscribe((result) => {
        console.log(result);
      });
    }
  }
}
