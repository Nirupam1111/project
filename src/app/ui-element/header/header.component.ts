import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IStaff } from '../../../app/models/staffs';
import { CommonMethods } from '../../../app/common-methods';
import { StaffService } from '../../../app/modules/staff/service/staff.service';
import { UiService } from '../../../app/ui.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

/**
 * This is the component class HeaderComponent of Ui-Element
 * @author Laharee
 * @version 1.0
 * @since 15/04/2023
 */
export class HeaderComponent implements OnInit {

  @Input() loginStatus: boolean;

  constructor(
    private staffsService: StaffService,
    private uiService: UiService,
    private router: Router
  ) { }

  //Taking logged-in Staff from CommonMethods
  staffId: any = CommonMethods.getItem("uid");

  //Taking perticular Staff Object to show in header
  staff: IStaff;

  /**
   * If loginStatus==true then this will show
   * @param changes SimpleChanges
   */
  ngOnChanges(changes: SimpleChanges) {
    for (let change in changes) {
      if (change == 'loginStatus') {
        this.loginStatus = changes[change].currentValue;
      }
    }
  }

  /**
   * initialize at first
   * calling getTheStaff
   */
  ngOnInit(): void {
    this.getTheStaff();
  }

  /**
   * For get the logged in staff for header profile
   */
  getTheStaff() {
    this.staffsService.getStaffById(this.staffId).subscribe(
      (data: any) => {
        this.staff = data.payload;
      }
    )
  }


  /**
  * Call removeItem() for remove all from local storage
  * @param "auth" - The key 
  * Set the loginValid(observable) false
  */
  logoutUser() {
    CommonMethods.removeItem("auth");
    CommonMethods.removeItem("token");
    CommonMethods.removeItem("uname");
    CommonMethods.removeItem("role");
    CommonMethods.removeItem("uid");
    CommonMethods.removeItem("businessId");
    this.uiService.loginValid.next(false);
    this.router.navigateByUrl('auth');

  }

}
