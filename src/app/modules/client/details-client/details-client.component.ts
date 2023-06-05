import { Component, OnInit } from '@angular/core';
import { IClient } from '../../../models/clients/clients';
import { EventService } from '../../../../app/services/events/events.service';
import { IEvent } from '../../../../app/models/event';
import { ModulesService } from '../../modules.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.scss'],
})

/**
 * This is the component class DetailsClientComponent of Client Module
 * @author Laharee
 * @version 1.0
 * @since 01/05/2023
 */
export class DetailsClientComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private modulesService: ModulesService
  ) { }

  //Taking UI base URL
  baseUrlUI = environment.UI_BASE_URL;

  //For taking the Client
  clients: IClient;

  //To get all Events
  events: IEvent[] = [];

  /**
   * It will call getEvents()
   * Get Client from the service property
   */
  ngOnInit(): void {
    this.clients = this.modulesService.clientObj;
    this.getEvents();
  }

  /**
   * assiging perticular event datas to eventObj
   * @param event sending perticular event details
   */
  setEvent(event: IEvent) {
    this.modulesService.eventObj = event;
  }

  /**
   * getting all the events of perticular client
   */
  getEvents() {
    //Sending perticular client ID to the EventService
    this.eventService.setEventUrl(this.clients.id);
    this.eventService.getEvents().subscribe(
      (data: any) => {
        this.events = data.payload;
      }
    )
  }
}
