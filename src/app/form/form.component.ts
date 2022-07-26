import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input('formTitle') formTitle: string;
  @Input('isLogin') isLogin: boolean;
  public invalidLogin: boolean;

  constructor(private authService: UserService) {}

  ngOnInit(): void {}

  submit(credentials: any) {
    console.log(credentials);
    // if (this.isLogin) {
    //   this.authService.login(credentials).subscribe((result) => {
    //     if (result) this.route;
    //   });
    // }
  }
}
