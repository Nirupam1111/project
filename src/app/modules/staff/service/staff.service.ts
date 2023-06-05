import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CommonMethods } from '../../../common-methods';
import { ApiResponse } from '../../../models/api';
import { IStaff, IStaffCreate } from '../../../models/staffs';
import { IStaffsService } from '../../../services/staffs/staffs.service';

@Injectable({
  providedIn: 'root',
})

/**
 * This is the component class StaffService of Staff Module
 * @author Wasif, Laharee
 * @version 1.0
 * @since 01/04/2023
 */
export class StaffService implements IStaffsService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  //Taking business ID from CommonMethods
  businessId: any = CommonMethods.getItem("businessId");
  //Setting Staff URL
  staffUrl: string = environment.API_BASE_URL + '/businesses/' + this.businessId + '/staffs';

  /**
   * generic function to handle Error
   * @param errorMessage to get the error message
   * @param error getting the error
   * @returns error
   */
  private handleError(errorMessage: string, error: HttpErrorResponse) {
    console.error(errorMessage, error);
    this.toastr.warning('Sorry! Some problem appeard in Staff Server');
    return throwError(() => error);
  }

  /**
   * Create a Staff
   * @param data
   * @returns  {Observable} returns an observable
   */
  public addStaff(data: IStaffCreate): Observable<ApiResponse<IStaff>> {
    return this.http
      .post<ApiResponse<IStaff>>(this.staffUrl, data)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handleError('Error! Cannot add data:', error)
        )
      );
  }

  /**
   * to get the staff/s from API
   * all the staffs are taken for staff page
   * @returns http status
   */
  public getStaff(): Observable<ApiResponse<IStaff>> {
    return this.http
      .get<ApiResponse<IStaff>>(this.staffUrl)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handleError('Error! Cannot load data:', error)
        )
      );
  }

  /**
   * Fetch information of a perticular Staffs by its Id
   * @param number Id of Staff
   * @return {Observable} returns an observable
   */
  public getStaffById(id: number): Observable<ApiResponse<IStaff>> {
    return this.http.get<ApiResponse<IStaff>>(
      this.staffUrl + `/${id}`
    );
  }

  /**
   *  Updates an existing Staff
   * @param object data of type IStaffCreate
   * @param number Id of Staff
   * @return {Observable} returns an observable
   */
  updateStaff(id: number, data: IStaffCreate): Observable<ApiResponse<IStaff>> {
    return this.http
      .put<ApiResponse<IStaff>>(this.staffUrl + `/${id}`, data)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handleError('Error! Cannot update data:', error)
        )
      );
  }

  /**
   * Delete an Staff
   * @param number Id of Staff
   * @return {Observable} returns an observable
   */
  public deleteStaff(id?: number): Observable<ApiResponse<IStaff>> {
    return this.http
      .delete<ApiResponse<IStaff>>(this.staffUrl + `/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handleError('Error! Cannot delete data:', error)
        )
      );
  }
}
