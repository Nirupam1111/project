import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';
import { CommonMethods } from '../../../common-methods';
import { ApiResponse } from '../../../models/api';
import { IClient, IClientCreate } from '../../../models/clients';
import { IClientsService } from '../../../services/clients/clients.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

/**
 * This is the component class ClientService of Client Module
 * @author Laharee
 * @version 1.0
 * @since 01/04/2023
 */
export class ClientService implements IClientsService {
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  //Taking business ID from CommonMethods
  businessId: any = CommonMethods.getItem("businessId");
  //Setting Client URL
  clientUrl: string = environment.API_BASE_URL + '/businesses/' + this.businessId + '/clients';

  /**
   * generic function to handle Error
   * @param errorMessage to get the error message
   * @param error getting the error
   * @returns error
   */
  private handleError(errorMessage: string, error: HttpErrorResponse) {
    console.error(errorMessage, error);
    this.toastr.warning('Sorry! Some problem appeard in Client Server');
    return throwError(() => error);
  }

  /**
   * Create a Client
   * @param data
   * @returns  {Observable} returns an observable
   */
  public addClient(data: IClientCreate): Observable<ApiResponse<IClient>> {
    return this.http
      .post<ApiResponse<IClient>>(this.clientUrl, data)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handleError('Error! Cannot add data:', error)
        )
      );
  }

  /**
   * to get the client/s from API
   * all the clients are taken for client page
   * @param id perticular client is taken for client profile
   * @returns http status
   */
  public getClients(): Observable<ApiResponse<IClient>> {
    return this.http
      .get<ApiResponse<IClient>>(this.clientUrl)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handleError('Error! Cannot load data:', error)
        )
      );
  }

  /**
   * Fetch information of a perticular Clients by its Id
   * @param number Id of Client
   * @return {Observable} returns an observable
   */
  public getClientById(id: number): Observable<ApiResponse<IClient>> {
    return this.http.get<ApiResponse<IClient>>(
      environment.API_BASE_URL + `/clients/${id}`
    );
  }

  /**
   *  Updates an existing Client
   * @param object data of type IClientCreate
   * @param number Id of Client
   * @return {Observable} returns an observable
   */
  updateClient(id: number, data: IClientCreate): Observable<ApiResponse<IClient>> {
    return this.http
      .put<ApiResponse<IClient>>(this.clientUrl + `/${id}`, data)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handleError('Error! Cannot update data:', error)
        )
      );
  }

  /**
   * Delete an Client
   * @param number Id of Client
   * @return {Observable} returns an observable
   */
  public deleteClient(id?: number): Observable<ApiResponse<IClient>> {
    return this.http
      .delete<ApiResponse<IClient>>(this.clientUrl + `/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handleError('Error! Cannot delete data:', error)
        )
      );
  }
}
