import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';
import { MessageModule } from '../../ui-element/message/message.module';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { ListStaffComponent } from './list-staff/list-staff.component';
import { StaffRoutingModule } from './staff-routing.module';
import { UpdateStaffComponent } from './update-staff/update-staff.component';

@NgModule({
  declarations: [
    ListStaffComponent,
    UpdateStaffComponent,
    AddStaffComponent,
    ListStaffComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MessageModule
  ]
})


export class StaffModule { }
