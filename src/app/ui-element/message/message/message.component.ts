import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../../../modules/client/service/client.service';
import { StaffService } from '../../../modules/staff/service/staff.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})

/**
 * This is the component class MessageComponent of Message Module
 * @author Laharee
 * @version 1.0
 * @since 25/04/2023
 */
export class MessageComponent {

  constructor(
    private clientService: ClientService,
    private toastr: ToastrService,
    private staffService: StaffService
  ) { }

  //Passing the related function
  @Input() ifTrue: () => void;

  //Passing perticular client and staff details otherwise it cannot find ID or anything
  @Input() clientObj: any;
  @Input() staffObj: any;

  //To passs message dynamically from any component
  @Input() theMessage: string;

  /**
   * To perform functions dynamically sent from any component
   */
  action() {
    this.ifTrue();
  }

}
