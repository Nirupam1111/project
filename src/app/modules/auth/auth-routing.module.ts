import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginGuard } from 'src/app/_guards/login.guard';

const routes: Routes = [
  { path: "", component: LoginComponent,canActivate:[LoginGuard] },
  { path: "register", component: RegistrationComponent },
  { path:"forgot-password",component:ForgotPasswordComponent},
  {path:"create-account",component:CreateAccountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
