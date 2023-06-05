import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/models/api';
import { IEvent, IEventCreate } from 'src/app/models/event';
@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  constructor(private _http: HttpClient) { }

  /**
   * Creates a new event
   * @param object data of type IEventCreate
   * @param number Id of client
   * @return {Observable} returns an obserrvable
   */
  addNewEvent(data: IEventCreate, clientId: number): Observable<ApiResponse<IEvent>> {
    return this._http.post<ApiResponse<IEvent>>(environment.API_BASE_URL + "clients/" + clientId + "/events", data)
  }
   /**
   * fetch the list of all event event
   * @param null
   * @return {Observable} returns an obserrvable
   */
  getEvent(): Observable<ApiResponse<IEvent[]>> {
    return this._http.get<ApiResponse<IEvent[]>>(environment.API_BASE_URL + "events?isActive=true")
  }
   /**
   * Fetch information of particular an event
   * @param number Id of event
   * @return {Observable} returns an obserrvable
   */
  getEventById(id: number): Observable<ApiResponse<IEvent>> {
    return this._http.get<ApiResponse<IEvent>>(environment.API_BASE_URL + `events/${id}`)
  }
   /**
   * Update an event
   * @param object data of type IEventCreate
   * @param number Id of event
   * @return {Observable} returns an obserrvable
   */
  updateEvent(data: any, id: number): Observable<ApiResponse<IEvent>> {
    return this._http.put<ApiResponse<IEvent>>(environment.API_BASE_URL + `events/${id}`, data)
  }
   /**
   * delete an event
   * @param number Id of event
   * @return {Observable} returns an obserrvable
   */
  deleteEvent(id: number): Observable<ApiResponse<IEvent>> {
    return this._http.delete<ApiResponse<IEvent>>(environment.API_BASE_URL + `events/${id}`)
  }
}
