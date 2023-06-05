import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IEvent, IEventCreate } from '../../models/event';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../../app/models/api';
import { CommonMethods } from '../../../app/common-methods';

@Injectable({
    providedIn: "root"
})

/**
 * This is the component class EventService of Service
 * @author Laharee
 * @version 1.0
 * @since 23/05/2023
 */
export class EventService {
    constructor(
        private http: HttpClient,
        private toastr: ToastrService
    ) { }

    //Taking business ID from CommonMethods
    businessId: any = CommonMethods.getItem("businessId");
    //To take Client Id
    clientId: number;
    //To take Event URL
    eventUrl: string;

    /**
     * To set Image URL
     * @param clientId To assign Client Id
     */
    setEventUrl(clientId: number) {
        this.clientId = clientId;
        this.eventUrl = environment.API_BASE_URL + `/businesses/${this.businessId}/clients/${this.clientId}/events`;
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
     * Create a Event
     * @param data
     * @returns  {Observable} returns an observable
     */
    public addEvent(data: IEventCreate): Observable<ApiResponse<IEvent>> {
        return this.http
            .post<ApiResponse<IEvent>>(this.eventUrl, data)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.handleError('Error! Cannot add data:', error)
                )
            );
    }

    /**
     * to get the event/s from API
     * all the events are taken for event page
     * @returns http status
     */
    public getEvents(): Observable<ApiResponse<IEvent>> {
        return this.http
            .get<ApiResponse<IEvent>>(this.eventUrl)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.handleError('Error! Cannot load data:', error)
                )
            );
    }

    /**
     *  Updates an existing Event
     * @param object data of type IEventCreate
     * @param number Id of Event
     * @return {Observable} returns an observable
     */
    updateEvent(id: number, data: IEventCreate): Observable<ApiResponse<IEvent>> {
        return this.http
            .put<ApiResponse<IEvent>>(this.eventUrl + `/${id}`, data)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.handleError('Error! Cannot update data:', error)
                )
            );
    }

    /**
     * Delete an Event
     * @param number Id of Event
     * @return {Observable} returns an observable
     */
    public deleteEvent(id?: number): Observable<ApiResponse<IEvent>> {
        return this.http
            .delete<ApiResponse<IEvent>>(this.eventUrl + `/${id}`)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.handleError('Error! Cannot delete data:', error)
                )
            );
    }
}