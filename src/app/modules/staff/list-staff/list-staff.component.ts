import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { StaffService } from '../service/staff.service';

@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrls: ['./list-staff.component.scss'],
})

/**
 * This is the component class ListStaffComponent of Staff Module
 * @author Laharee
 * @version 1.0
 * @since 01/04/2023
 */
export class ListStaffComponent implements OnInit {
  constructor(
    private staffService: StaffService,
    private toastr: ToastrService
  ) { }

  //To send perticular message to the messageComponent
  messageFromStaff: string = 'Do you want to DELETE the staff info?';

  //Taking UI base URL
  baseUrlUI = environment.UI_BASE_URL;

  //class variable so that I can assign perticular staff object
  staffObj: any;

  //to get all the staff
  staffs: any[] = [];

  /**
   * initializing getStaff() on ngOnInit
   */
  ngOnInit(): void {
    this.getStaffs();
  }

  /**
   * getting all the staffs
   */
  getStaffs() {
    this.staffService.getStaff().subscribe((page: any) => {
      this.staffs = page.payload;
    });
  }

  /**
   * assiging perticular staff datas to staffObj
   * @param staff sending perticular staff details
   */
  perticularStaff(staff: any) {
    this.staffObj = staff;
  }

  /**
   * Deleting particular Staff
   */
  deleteStaff() {
    this.staffService.deleteStaff(this.staffObj.id).subscribe((response) => {
      console.log('Client record Deleted!', response);
      this.toastr.error('Staff record Deleted');
      window.location.reload();
    });
  }
}
