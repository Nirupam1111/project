import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { EventServiceService } from '../event-service.service';
import { ApiResponse } from 'src/app/models/api';
import { IEvent } from 'src/app/models/event';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit {

  // variables
  eventUpdate: FormGroup;
  url: any[] = []
  eventDetails: any = {}

  constructor(
    private eventService: EventServiceService,
    private router: Router,
    private zone: NgZone) { }

  ngOnInit(): void {
    // extracting eventid from url
    this.url = this.router.url.split('/');
    // console.log(this.url[3]);

    // calling getEventById method from service
    this.eventService.getEventById(this.url[3]).subscribe((response: ApiResponse<IEvent>) => {
      this.eventDetails = response.payload;
      // console.log(this.eventDetails)
    })

    // creating a new formgroup
    this.eventUpdate = new FormGroup({
      name: new FormControl(),
      date: new FormControl(),
      description: new FormControl()
    });
  }

  // clickevent for creating data objcet and sending get to update event method
  new_Event() {
    // creating data object
    let data = {
      "date": this.eventUpdate.value.date || this.eventDetails.date,
      "description": this.eventUpdate.value.description || this.eventDetails.description,
      "name": this.eventUpdate.value.name || this.eventDetails.name,
    }

    // calling updateEvent method from service
    this.eventService.updateEvent(data, this.url[3]).subscribe((response: ApiResponse<IEvent>) => {
      // rediceting to event-list page
      this.zone.runOutsideAngular(() => {
        window.location.href = '/event';
      });
    })

  }

// getter method
  get name() {
    return this.eventUpdate.get('name');
  }
  get date() {
    return this.eventUpdate.get('date');
  }
  get description() {
    return this.eventUpdate.get('description');
  }

}
