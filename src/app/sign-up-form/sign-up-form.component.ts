import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  formDetails = {
    title: 'Sign Up',
    isLogin: false
  }
  constructor() { }

  ngOnInit(): void {
  }

}
