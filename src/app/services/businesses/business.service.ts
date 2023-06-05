import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../../models/api';
import { IBusiness, IBusinessCreate } from '../../models/businesses';
import { environment } from '../../../environments/environment';
import { CommonMethods } from '../../../app/common-methods';

@Injectable({
    providedIn: 'root',
})

/**
 * This is the component class BusinessService of Profile Module
 * @author Laharee
 * @version 1.0
 * @since 15/04/2023
 */
export class BusinessService {
    constructor(private http: HttpClient, private toastr: ToastrService) { }

    //Taking business ID from CommonMethods
    businessId: any = CommonMethods.getItem("businessId");
    //To take Business URL
    businessUrl: string = environment.API_BASE_URL + '/businesses/' + this.businessId;

    /**
     * generic function to handle Error
     * @param errorMessage to get the error message
     * @param error getting the error
     * @returns error
     */
    private handleError(errorMessage: string, error: HttpErrorResponse) {
        console.error(errorMessage, error);
        this.toastr.warning('Sorry! Some problem appeard in Business Server');
        return throwError(() => error);
    }

    /**
     * Create a Business
     * @param data
     * @returns  {Observable} returns an observable
     */
    public addBusiness(data: IBusinessCreate): Observable<ApiResponse<IBusiness>> {
        return this.http
            .post<ApiResponse<IBusiness>>(this.businessUrl, data)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.handleError('Error! Cannot add data:', error)
                )
            );
    }

    /**
     * Fetch information of a perticular Businesses by its Id
     * @param number Id of Business
     * @return {Observable} returns an observable
     */
    public getBusinessById(): Observable<ApiResponse<IBusiness>> {
        return this.http.get<ApiResponse<IBusiness>>(
            this.businessUrl
        );
    }

    /**
     *  Updates an existing Business
     * @param object data of type IBusinessCreate
     * @param number Id of Business
     * @return {Observable} returns an observable
     */
    updateBusiness(data: IBusinessCreate): Observable<ApiResponse<IBusiness>> {
        return this.http
            .put<ApiResponse<IBusiness>>(this.businessUrl, data)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.handleError('Error! Cannot update data:', error)
                )
            );
    }

    /**
     * Delete an Business
     * @param number Id of Business
     * @return {Observable} returns an observable
     */
    public deleteBusiness(): Observable<ApiResponse<IBusiness>> {
        return this.http
            .delete<ApiResponse<IBusiness>>(this.businessUrl)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.handleError('Error! Cannot delete data:', error)
                )
            );
    }
}
