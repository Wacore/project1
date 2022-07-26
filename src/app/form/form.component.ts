import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input('formTitle') formTitle: string;
  @Input('isLogin') isLogin: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  submit(f: any) {
    console.log(f)
  }

}
