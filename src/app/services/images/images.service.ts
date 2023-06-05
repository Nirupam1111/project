import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IImage } from '../../models/images';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../../app/models/api';
import { CommonMethods } from '../../../app/common-methods';

@Injectable({
    providedIn: "root"
})

/**
 * This is the component class ImageService of Service
 * @author Laharee
 * @version 1.0
 * @since 23/05/2023
 */
export class ImageService {
    constructor(
        private http: HttpClient,
        private toastr: ToastrService
    ) { }

    //Taking business ID from CommonMethods
    businessId: any = CommonMethods.getItem("businessId");
    //To take Client Id
    clientId: number;
    //To take Event Id
    eventId: number;
    //To take Image URL
    imageUrl: string;

    /**
     * To set Image URL
     * @param clientId To assign Client Id
     * @param eventId To assign Event Id
     */
    setImageUrl(clientId: number, eventId: number) {
        this.clientId = clientId;
        this.eventId = eventId;
        this.imageUrl = environment.API_BASE_URL + `/businesses/ + ${this.businessId} + /clients/ + ${this.clientId}/events/${this.eventId}/images/`;
    }

    /**
     * generic function to handle Error
     * @param errorMessage to get the error message
     * @param error getting the error
     * @returns error
     */
    private handleError(errorMessage: string, error: HttpErrorResponse) {
        console.error(errorMessage, error);
        this.toastr.error("Sorry! Some problem may have occured");
        return throwError(() => error);
    }


    /**
     * Create a Image
     * @param data
     * @returns  {Observable} returns an observable
     */
    public addImage(data: IImage): Observable<ApiResponse<IImage>> {
        return this.http
            .post<ApiResponse<IImage>>(this.imageUrl, data)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.handleError('Error! Cannot add data:', error)
                )
            );
    }

    /**
     * to get the image/s from API
     * all the images are taken for image page
     * @returns http status
     */
    public getImages(): Observable<ApiResponse<IImage>> {
        return this.http
            .get<ApiResponse<IImage>>(this.imageUrl)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.handleError('Error! Cannot load data:', error)
                )
            );
    }

    /**
     *  Updates an existing Image
     * @param object data of type IImageCreate
     * @param number Id of Image
     * @return {Observable} returns an observable
     */
    updateImage(
        id: number,
        data: IImage
    ): Observable<ApiResponse<IImage>> {
        return this.http
            .put<ApiResponse<IImage>>(this.imageUrl + `/${id}`, data)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.handleError('Error! Cannot update data:', error)
                )
            );
    }

    /**
     * Delete an Image
     * @param number Id of Image
     * @return {Observable} returns an observable
     */
    public deleteImage(id?: number): Observable<ApiResponse<IImage>> {
        return this.http
            .delete<ApiResponse<IImage>>(this.imageUrl + `/${id}`)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.handleError('Error! Cannot delete data:', error)
                )
            );
    }
}