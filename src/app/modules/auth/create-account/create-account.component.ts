import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  constructor() { }
  createAccount: FormGroup;

  ngOnInit(): void {
    this.createAccount = new FormGroup(
      {
        companyName: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9\s]+$")]),

      }
    )
  }

}
