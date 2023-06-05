import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ListClientComponent } from '../list-client/list-client.component';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})

/**
 * This is the component class AddClientComponent of Client Module
 * @author Laharee
 * @version 1.0
 * @since 01/04/2023
 */
export class AddClientComponent {
  constructor(
    private clientService: ClientService,
    private toastr: ToastrService,
    private ListClientComponent: ListClientComponent
  ) { }

  /**
   * Declaring form name and control names
   */
  addForm = new FormGroup({
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/),
    ]),
  });

  /**
   * To add a new client for a perticular business
   */
  addClient() {
    //if valid, then only sending the data otherwise showing toast
    if (this.addForm.valid) {
      let data: any = {
        phoneNo: this.addForm.value.phoneNo,
      };
      this.clientService.addClient(data).subscribe((response) => {
        this.toastr.success('Client added successfully');
        this.ListClientComponent.getClients();
      });
    } else {
      this.toastr.error('Please add all the data properly');
    }
  }
}
