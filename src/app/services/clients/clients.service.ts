import { Observable } from 'rxjs';

export interface IClientsService {
    /**
     * to get the client/s from API
     * all the clients are taken for client page
     * @param id perticular client is taken for client profile
     * @returns http status
     */
    getClients(): Observable<any>;

    getClientById(id: number): Observable<any>;

    /**
     * to post the clients from API
     * @returns http status
     */
    addClient(data: any): Observable<any>;

    /**
     * to update the clients from API
     * @returns http status
     */
    updateClient(id: any, data: any): Observable<any>;

    /**
     * to delete the clients from API
     * @returns http status
     */
    deleteClient(id: number): Observable<any>;
}