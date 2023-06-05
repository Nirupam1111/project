import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../service/client.service';
import { ListClientComponent } from '../list-client/list-client.component'
import { IClient } from '../../../models/clients/clients';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss'],
})

/**
 * This is the component class UpdateClientComponent of Client Module
 * @author Laharee
 * @version 1.0
 * @since 01/04/2023
 */
export class UpdateClientComponent implements OnChanges {

  constructor(
    private clientsService: ClientService,
    private toastr: ToastrService,
    private ListClientComponent: ListClientComponent,
  ) { }

  //binding perticular client for edit-modal
  @Input() clients: IClient;

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
   * On change taking values to the editForm from the ClientListComponent
   */
  ngOnChanges() {
    this.editForm.patchValue({
      email: this.clients?.email,
      phoneNo: this.clients?.phoneNo.toString(),
      firstName: this.clients?.firstName,
      lastName: this.clients?.lastName,
      line1: this.clients?.address?.line1,
      line2: this.clients?.address?.line2,
      city: this.clients?.address?.city,
      pincode: this.clients?.address?.pincode.toString(),
      district: this.clients?.address?.district,
      state: this.clients?.address?.state,
      country: this.clients?.address?.country
    });
  }

  /**
   * To add a new client for a perticular business
   */
  updateClient() {
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

      this.clientsService.updateClient(this.clients.id, data).subscribe(
        response => {
          console.log("Client record Updated" + response);
          this.toastr.success("Client record Updated");
          this.ListClientComponent.getClients();
        }
      )
    }
    else {
      this.toastr.warning("Please add all the datas properly");
      this.toastr.error("Failed..!");
    }
  }
}
