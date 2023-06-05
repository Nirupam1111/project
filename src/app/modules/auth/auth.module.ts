import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthService } from './services/auth.service';
import {  HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

import { CreateAccountComponent } from './create-account/create-account.component';
import { NgOtpInputModule } from  'ng-otp-input';

@NgModule({
  declarations: [
    RegistrationComponent,
    ForgotPasswordComponent,
    LoginComponent,
    CreateAccountComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOtpInputModule
  ],
  providers:[AuthService]
})
export class AuthModule { }
