import { Injectable } from '@angular/core';
import { IEvent } from '../models/event/event';
import { IClient } from '../models/clients';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  constructor() { }

  //class variable so that I can assign perticular client object
  clientObj: IClient;

  //class variable so that I can assign perticular event object
  eventObj: IEvent;
}
