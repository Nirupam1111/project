import { Observable } from 'rxjs';

export interface IStaffsService {
    /**
     * to get the staff/s from API
     * all the staffs are taken for staff page
     * @param id perticular staff is taken for staff profile
     * @returns http status
     */
    getStaff(): Observable<any>;

    getStaffById(id: number): Observable<any>;

    /**
     * to post the staffs from API
     * @returns http status
     */
    addStaff(data: any): Observable<any>;

    /**
     * to update the staffs from API
     * @returns http status
     */
    updateStaff(id: any, data: any): Observable<any>;

    /**
     * to delete the staffs from API
     * @returns http status
     */
    deleteStaff(id: number): Observable<any>;
}
