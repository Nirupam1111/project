import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { ListStaffComponent } from './list-staff/list-staff.component';
import { UpdateStaffComponent } from './update-staff/update-staff.component';

const routes: Routes = [
  { path: "", component: ListStaffComponent },
  { path: "add", component: AddStaffComponent },
  { path: "update/:id", component: UpdateStaffComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule,
  ]
})
export class StaffRoutingModule { }
