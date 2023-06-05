import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ListStaffComponent } from '../list-staff/list-staff.component';
import { StaffService } from '../service/staff.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss'],
})

/**
 * This is the component class AddStaffComponent of Staff Module
 * @author Laharee
 * @version 1.0
 * @since 01/04/2023
 */
export class AddStaffComponent {
  constructor(
    private staffService: StaffService,
    private toastr: ToastrService,
    private ListStaffComponent: ListStaffComponent
  ) { }

  /**
   * Declaring form name and control names
   */
  addForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
    phoneNo: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    firstName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,10}$/)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,10}$/)]),
    line1: new FormControl('', [Validators.required, Validators.pattern(/^(?:[\w.]+\s*){1,5}$/)]),
    line2: new FormControl(),
    city: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?:-[a-zA-Z]+)?$/)]),
    district: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?:-[a-zA-Z]+)?$/)]),
    state: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?:-[a-zA-Z]+)?$/)]),
    country: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,15}$/)]),
    pincode: new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)]),
  });

  /**
   * To add a new staff for a perticular business
   */
  addStaff() {
    //if valid, then only sending the data otherwise showing toast
    if (this.addForm.valid) {
      var data: any = {
        email: this.addForm.value.email,
        phoneNo: this.addForm.value.phoneNo,
        firstName: this.addForm.value.firstName,
        lastName: this.addForm.value.lastName,
        address: {
          line1: this.addForm.value.line1,
          line2: this.addForm.value.line2,
          city: this.addForm.value.city,
          pincode: this.addForm.value.pincode,
          district: this.addForm.value.district,
          state: this.addForm.value.state,
          country: this.addForm.value.country,
        },
      };
      this.staffService.addStaff(data).subscribe((response) => {
        console.log('Staff added successfully' + response);
        this.toastr.success('Staff added successfully');
        this.ListStaffComponent.getStaffs();
      });
    } else {
      this.toastr.warning('Please add all the data properly');
      this.toastr.error('Failed..!');
    }
  }
}
