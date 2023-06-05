import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StaffService } from '../service/staff.service';
import { ListStaffComponent } from '../list-staff/list-staff.component'
import { IStaff } from '../../../models/staffs/staffs';

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.scss'],
})

/**
 * This is the component class UpdateStaffComponent of Staff Module
 * @author Laharee
 * @version 1.0
 * @since 01/04/2023
 */
export class UpdateStaffComponent implements OnChanges {

  constructor(
    private staffsService: StaffService,
    private toastr: ToastrService,
    private ListStaffComponent: ListStaffComponent
  ) { }

  //binding perticular staff for edit-modal
  @Input() staffObj: IStaff;

  /**
   * Declaring form name and control names
   */
  editForm = new FormGroup(
    {
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
    }
  )

  /**
   * On change taking values to the editForm from the StaffListComponent
   */
  ngOnChanges() {
    this.editForm.patchValue({
      email: this.staffObj?.email,
      phoneNo: this.staffObj?.phoneNo.toString(),
      firstName: this.staffObj?.firstName,
      lastName: this.staffObj?.lastName,
      line1: this.staffObj?.address?.line1,
      line2: this.staffObj?.address?.line2,
      city: this.staffObj?.address?.city,
      pincode: this.staffObj?.address?.pincode.toString(),
      district: this.staffObj?.address?.district,
      state: this.staffObj?.address?.state,
      country: this.staffObj?.address?.country
    });
  }

  /**
   * To add a new staff for a perticular business
   */
  updateStaff() {
    var data: any;
    if (this.editForm.valid) {
      data = {
        "email": this.editForm.value.email,
        "phoneNo": this.editForm.value.phoneNo,
        "firstName": this.editForm.value.firstName,
        "lastName": this.editForm.value.lastName,
        "address": {
          "line1": this.editForm.value.line1,
          "line2": this.editForm.value.line2,
          "city": this.editForm.value.city,
          "pincode": this.editForm.value.pincode,
          "district": this.editForm.value.district,
          "state": this.editForm.value.state,
          "country": this.editForm.value.country
        }
      };
    }
    else {
      this.toastr.warning("Please add all the datas properly");
      this.toastr.error("Failed..!");
    }

    this.staffsService.updateStaff(this.staffObj.id, data).subscribe(
      response => {
        console.log("Staff record Updated" + response);
        this.toastr.success("Staff record Updated");
        this.ListStaffComponent.getStaffs();
      }
    )
  }
}
