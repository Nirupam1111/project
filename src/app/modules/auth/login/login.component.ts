import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonMethods } from '../../../../app/common-methods';
import { ApiResponse } from '../../../../app/models/api';
import { AuthService } from '../services/auth.service';
import { UiService } from '../../../../app/ui.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginGroup: FormGroup;
  authloginArray: any[] = [];
  otpFormInput = ['input1', 'input2', 'input3', 'input4'];
  @ViewChildren('formRow') rows: any;
  form: any;

  constructor(
    private authservice: AuthService,
    private _tosterService: ToastrService,
    private _router: Router,
    private uiService: UiService
  ) {
    this.form = this.toFormGroup(this.otpFormInput);
  }

  ngOnInit(): void {
  }

  toFormGroup(elements: any) {
    const group: any = {};
    group['mobile'] = new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}")]);
    elements.forEach((key: any) => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }
  keyUpEvent(event: any, index: number) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1;
    } else {
      pos = index + 1;
    }
    if (pos > -1 && pos < this.otpFormInput.length) {
      this.rows._results[pos].nativeElement.focus();
    }
  }

  onSubmit() {

    if (this.form.valid) {
      let otp = this.otpFormInput.map((value) => String(this.form.value[value])).join("")

      let data = {
        "otp": otp,
        "phoneNo": this.form.value['mobile']
      }
      this.authservice.login(data).subscribe({
        next: (res: ApiResponse<any>) => {
          if (res.status == 200 || res.status == 201) {
            let authToken = res.payload.accessToken;
            let decrypted_token: string = atob(authToken.split('.')[1]);
            if (!decrypted_token) {
              this._tosterService.error("Invalid token. Please try again.");
            } else {
              let tokenObj = JSON.parse(decrypted_token);
              if (!tokenObj.id || !tokenObj.auth['authority']) {
                this._tosterService.error("Invalid token. Please try again.");
              } else {
                CommonMethods.setItem("token", authToken);
                CommonMethods.setItem("auth", true);
                CommonMethods.setItem("uname", `${tokenObj.firstName} ${tokenObj.lastName}`);
                CommonMethods.setItem("role", tokenObj.auth['authority']);
                CommonMethods.setItem("uid", tokenObj.id);
                CommonMethods.setItem("businessId", tokenObj.businessId);
                this.uiService.loginValid.next(true);
                this._router.navigate(["dashboard"]);
              }
            }
          } else {
            this._tosterService.error(res.message);
          }

        },
        error: (err: any) => {
          console.log(err)
          this._tosterService.error(err.message)
        }
      })
    }

  }

}
