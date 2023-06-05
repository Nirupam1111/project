import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { ClientService } from '../service/client.service';
import { IClient } from '../../../../app/models/clients';
import { ModulesService } from '../../modules.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss'],
})

/**
 * This is the component class ListClientComponent of Client Module
 * @author Laharee
 * @version 1.0
 * @since 01/04/2023
 */
export class ListClientComponent implements OnInit {
  constructor(
    private clientService: ClientService,
    private toastr: ToastrService,
    private modulesService: ModulesService
  ) { }

  //To send perticular message to the messageComponent
  messageFromClient: string = 'Do you want to DELETE the client info?';

  //Taking UI base URL
  baseUrlUI = environment.UI_BASE_URL;

  //class variable so that I can assign perticular client object
  clientObj: IClient;

  //to get all the client
  clients: IClient[] = [];

  /**
   * initializing getClient() on ngOnInit
   */
  ngOnInit(): void {
    this.getClients();
  }

  /**
   * getting all the clients
   */
  getClients() {
    this.clientService.getClients().subscribe((data: any) => {
      this.clients = data.payload;
    });
  }

  /**
   * assiging perticular client datas to clientObj
   * @param client sending perticular client details
   */
  setClient(client: IClient) {
    this.clientObj = client;
    this.modulesService.clientObj = client;
  }

  /**
   * Deleting particular Client
   */
  deleteClient() {
    this.clientService.deleteClient(this.clientObj.id).subscribe((response) => {
      window.location.reload();
      this.toastr.success('Client record Deleted');
    });
  }
}
