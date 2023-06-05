import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/models/api';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 

  }
  businessRegistration(data:any): Observable<any> {
    return this.http.post(environment.API_BASE_URL+"businesses",data);

  }
  login(data:any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(environment.API_BASE_URL+"/auth/staffs/login",data);
  }
}
