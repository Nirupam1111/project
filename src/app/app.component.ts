import { Component, OnInit } from '@angular/core';
import { CommonMethods } from './common-methods';
import { UiService } from './ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  loginStatus: boolean = false;

  constructor(private uiService: UiService) { }

  ngOnInit() {
    let auth = CommonMethods.getItem("auth");
    if (auth) {
      this.loginStatus = true;
    } else {
      this.loginStatus = false;
    }

    this.uiService.loginValid.subscribe((value) => {
      if (value != null) {
        this.loginStatus = value;
      }

    })

  }
}
