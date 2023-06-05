import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  // Subject to change on login / logout
  loginValid = new Subject<boolean>();

  constructor() { }
}
