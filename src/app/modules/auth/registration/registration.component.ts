import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  regform: FormGroup;
  authRegistrationArray: any[] = [];
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.regform = new FormGroup({
      bisinessName: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9\s]+$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phno: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern("[0-9]+$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      conpassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
      pin: new FormControl('', [Validators.required, Validators.minLength(6)])


    })
  }
  businessRegistrations() {
    let data = {
      "phoneNo": this.regform.value.phno
    }
    this._authService.businessRegistration(data).subscribe((response) => {
      console.log(response);
      this.authRegistrationArray = response;
    })
  }

  regSubmit() {

  }
  get bisinessName() {
    return this.regform.get("bisinessName");
  }
  get email() {
    return this.regform.get("email");
  }
  get phno() {
    return this.regform.get("phno");
  }
  get password() {
    return this.regform.get("password");
  }
  get conpassword() {
    return this.regform.get("conpassword");
  }
  get pin() {
    return this.regform.get("pin");
  }
}
