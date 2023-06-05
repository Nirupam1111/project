import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() loginStatus: boolean;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    for (let change in changes) {
      if (change == 'loginStatus') {
        this.loginStatus = changes[change].currentValue;
      }
    }
  }

  ngOnInit(): void {
  }

}
