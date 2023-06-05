import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BusinessService } from '../../../services/businesses/business.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})

/**
 * This is the component class BusinessProfileComponent of Profile Module
 * @author Laharee
 * @version 1.0
 * @since 15/04/2023
 */
export class BusinessProfileComponent implements OnInit {

  constructor(
    private businessService: BusinessService,
    private toastr: ToastrService,
  ) { }

  //taking image property
  imageUrl = "";
  placeholder = "../../../../assets/images/profile.png";

  //Taking each section name, arrowUp is for toggling arrow button, default is true
  sections = [
    {
      name: 'Profile',
      isEdit: false
    },
    {
      name: 'Address',
      isEdit: false
    }
  ];

  //Taking UI base URL
  baseUrlUI = environment.UI_BASE_URL;

  //Taking the business property to get the values from API
  business: any = [];

  /**
   * Declaring form name and control names
   */
  editBusinessForm = new FormGroup(
    {
      registrationNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
      phoneNo: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      ownerFirstName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,10}$/)]),
      ownerLastName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,10}$/)]),
      name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?:-[a-zA-Z]+)?$/)]),
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
    this.getBusiness()
  }

  /**
   * Getting the perticular staff
   */
  getBusiness() {
    this.businessService.getBusinessById().subscribe(
      (data: any) => {
        this.business = data.payload;

        //Taking valus in editBusinessForm
        this.editBusinessForm.patchValue({
          registrationNumber: this.business?.registrationNumber,
          email: this.business?.email,
          phoneNo: this.business?.phoneNo,
          ownerFirstName: this.business?.ownerFirstName,
          ownerLastName: this.business?.ownerLastName,
          name: this.business?.name,
          line1: this.business?.address?.line1,
          line2: this.business?.address?.line2,
          city: this.business?.address?.city,
          pincode: this.business?.address?.pincode.toString(),
          district: this.business?.address?.district,
          state: this.business?.address?.state,
          country: this.business?.address?.country
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
   * to update a business
   */
  updateBusiness() {
    var data: any;
    if (this.editBusinessForm.valid) {
      data = {
        "registrationNumber": this.editBusinessForm.value.registrationNumber,
        "email": this.editBusinessForm.value.email,
        "phoneNo": this.editBusinessForm.value.phoneNo,
        "ownerFirstName": this.editBusinessForm.value.ownerFirstName,
        "ownerLastName": this.editBusinessForm.value.ownerLastName,
        "name": this.editBusinessForm.value.name,
        "address": {
          "line1": this.editBusinessForm.value.line1,
          "line2": this.editBusinessForm.value.line2,
          "city": this.editBusinessForm.value.city,
          "pincode": this.editBusinessForm.value.pincode,
          "district": this.editBusinessForm.value.district,
          "state": this.editBusinessForm.value.state,
          "country": this.editBusinessForm.value.country
        }
      };
    }
    else {
      this.toastr.warning("Please add all the datas properly");
      this.toastr.error("Failed..!");
    }
    this.businessService.updateBusiness(data).subscribe(
      (response) => {
        this.toastr.success("Data updated successfully!");
        this.getBusiness();
      }
    )
  }
}
