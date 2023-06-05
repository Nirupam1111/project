import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProfileRoutingModule } from './profile-routing.module';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';



@NgModule({
  declarations: [
    StaffProfileComponent,
    BusinessProfileComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
