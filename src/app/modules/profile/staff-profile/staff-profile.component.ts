import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StaffService } from '../../staff/service/staff.service';
import { environment } from '../../../../environments/environment';
import { CommonMethods } from '../../../../app/common-methods';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss'],
})

/**
 * This is the component class StaffProfileComponent of Profile Module
 * @author Laharee
 * @version 1.0
 * @since 15/04/2023
 */
export class StaffProfileComponent implements OnInit {

  constructor(
    private staffsService: StaffService,
    private toastr: ToastrService,
  ) { }

  //Taking logged-in Staff from CommonMethods
  staffId: any = CommonMethods.getItem("uid");

  //taking image properties
  imageUrl = '';
  placeholder = '../../../../assets/images/profile.png';

  //Taking each section name, arrowUp is for toggling arrow button, default is true
  sections = [
    {
      name: 'Profile',
      isEdit: false,
    },
    {
      name: 'Address',
      isEdit: false,
    },
  ];

  //Taking UI base URL
  baseUrlUI = environment.UI_BASE_URL;

  //Taking the staff property to get the values from API
  staff: any = [];

  /**
   * Declaring form name and control names
   */
  editStaffForm = new FormGroup(
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
   * This will initialize when the class will execute
   */
  ngOnInit() {
    this.getStaff();
  }

  /**
   * Getting the perticular staff
   */
  getStaff() {
    this.staffsService.getStaffById(this.staffId).subscribe(
      (data: any) => {
        this.staff = data.payload;

        //Taking values in EditStaffForm
        this.editStaffForm.setValue({
          email: this.staff?.email,
          phoneNo: this.staff?.phoneNo.toString(),
          firstName: this.staff?.firstName,
          lastName: this.staff?.lastName,
          line1: this.staff?.address?.line1,
          line2: this.staff?.address?.line2,
          city: this.staff?.address?.city,
          pincode: this.staff?.address?.pincode.toString(),
          district: this.staff?.address?.district,
          state: this.staff?.address?.state,
          country: this.staff?.address?.country
        });
      }
    );
  }

  /**
   * If there's any error in loading image this placeholder will show
   * @param event type event
   */
  handleImageError(event: any) {
    event.target.src = this.placeholder;
  }

  /**
   * To upload new image from computer
   * @todo understand this part or modify, taken from chatGTPT
   * @todo understand this part or modify, taken from chatGTPT
   */
  updateImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: Event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length) {
        const file = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageUrl = reader.result as string;
        };
      }
    };
    input.click();
  }

  /**
   * to update a staff
   */
  updateStaff() {
    var data: any;
    if (this.editStaffForm.valid) {
      data = {
        "email": this.editStaffForm.value.email,
        "phoneNo": this.editStaffForm.value.phoneNo,
        "firstName": this.editStaffForm.value.firstName,
        "lastName": this.editStaffForm.value.lastName,
        "address": {
          "line1": this.editStaffForm.value.line1,
          "line2": this.editStaffForm.value.line2,
          "city": this.editStaffForm.value.city,
          "pincode": this.editStaffForm.value.pincode,
          "district": this.editStaffForm.value.district,
          "state": this.editStaffForm.value.state,
          "country": this.editStaffForm.value.country
        }
      };
    }
    else {
      this.toastr.warning("Please add all the datas properly");
      this.toastr.error("Failed..!");
    }

    this.staffsService.updateStaff(this.staff.id, data).subscribe(
      (response) => {
        this.toastr.success("Data updated successfully!");
        this.getStaff();
      }
    )
  }
}