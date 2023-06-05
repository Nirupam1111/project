import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventServiceService } from '../event-service.service';
import { NgZone } from '@angular/core';
import { IEvent, IEventCreate } from 'src/app/models/event';
import { ApiResponse } from 'src/app/models/api';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {


  eventForm: FormGroup;
  eventArr: any[] = []
  constructor(public _eventService: EventServiceService) { }

  ngOnInit(): void {

    this.eventForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    })
  }

  eventSubmit() {
    let data = {
      "date": this.eventForm.value.date,
      "description": this.eventForm.value.description,
      "name": this.eventForm.value.name,
    }

    console.log(data);
    this._eventService.addNewEvent(data, 1).subscribe((response: ApiResponse<IEvent>) => {
      console.log(response);
      // this.eventArr = response;
    });
  }

  get name() {
    return this.eventForm.get('name')
  }
  get date() {
    return this.eventForm.get('date')
  }
  get description() {
    return this.eventForm.get('description')
  }
}
