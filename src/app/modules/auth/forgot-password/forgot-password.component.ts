import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotpasswordform: FormGroup
  constructor() { }

  ngOnInit(): void {
    this.forgotpasswordform = new FormGroup({
      Phno: new FormControl('', [Validators.required, Validators.minLength(10)])
    })
  }

  get phno() {
    return this.forgotpasswordform.get("phno");
  }
}
