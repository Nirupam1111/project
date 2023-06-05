import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IEvent } from '../../../../app/models/event';
import { ModulesService } from '../../modules.service';

@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.scss']
})
export class DetailsEventComponent implements OnInit {

  constructor(
    private modulesService: ModulesService
  ) { }
  //Taking for files
  imgFiles: string[] = [];

  //Taking UI base URL
  baseUrlUI = environment.UI_BASE_URL;

  //binding perticular client for details
  event: IEvent;

  ngOnInit(): void {
    this.event = this.modulesService.eventObj;
  }

  selectFolder(): void {
    const select = document.createElement('input') as any;
    select.type = 'file';
    select.webkitdirectory = true;
    select.directory = true;
    select.addEventListener('change', () => {
      const files = select.files;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = () => {
          this.imgFiles[i] = reader.result as string;
        };
      }
    });
    select.click();
  }

}
