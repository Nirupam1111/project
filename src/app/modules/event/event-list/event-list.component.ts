import { Component, OnInit } from '@angular/core';
import { EventServiceService } from '../event-service.service';
import { NgZone } from '@angular/core';

import { IEvent } from 'src/app/models/event';
import { ApiResponse } from 'src/app/models/api';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  // variables
  // eventArr:IEvent[]=[]
  eventArr: IEvent[] | undefined = []

  constructor(
    private eventService: EventServiceService,
    private zone: NgZone) {

  }


  ngOnInit(): void {
    // calling getEvent method from service
    this.eventService.getEvent().subscribe((response: ApiResponse<IEvent[]>) => {
      // console.log(response.payload);
      // this.eventArr=response.payload  
      this.eventArr = response.payload
      // console.log(this.eventArr);
    })
  }
  // clickevent for delete button
  onDeleteEvent(name: string, id: number) {
    // console.log(name, id)
    // conformation from user for deletion
    if (confirm(`Are you sure to DELETE data of ${name} ? `)) {
      // calling deleteEvent method from service
      this.eventService.deleteEvent(id).subscribe((response: ApiResponse<IEvent>) => {
        // console.log(response);
        // redirecting to event-list page
        this.zone.runOutsideAngular(() => {
          window.location.href = '/event';
        });
      });
    }
  }

}
