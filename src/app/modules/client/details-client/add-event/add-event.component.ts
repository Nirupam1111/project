import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DetailsClientComponent } from '../details-client.component'
import { EventService } from '../../../../../app/services/events/events.service';
import { ModulesService } from '../../../../../app/modules/modules.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})

/**
 * This is the component class AddEventComponent of Client Module
 * @author Laharee
 * @version 1.0
 * @since 23/05/2023
 */
export class AddEventComponent {

  constructor(
    private detailsClientComponent: DetailsClientComponent,
    private eventService: EventService,
    private toastr: ToastrService,
    private modulesService: ModulesService
  ) { }



  //Taking for files
  imgFiles: string[] = [];

  //To take today's date
  date: Date = new Date()

  //Taking form group to add Event
  addEventForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?:-[a-zA-Z]+)?$/)]),
    description: new FormControl('', [Validators.required, Validators.pattern(/^(?:[\w.]+\s*){1,50}$/)]),
    sourceDirectoryPath: new FormControl('', [Validators.required]),
  })

  /**
   * This will select a folder
   * and show it to the input box
   */
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
      if (files?.length >= 0) {
        const folderPath = files[0].webkitRelativePath.split('/')[0];
        this.addEventForm.get('sourceDirectoryPath')?.setValue(folderPath);
      }
    });
    select.click();
  }

  /**
   * This will add an Event for the Client
   */
  addEvent() {
    //Sending perticular client ID to the EventService
    this.eventService.setEventUrl(this.modulesService.clientObj.id);

    if (this.addEventForm.valid) {
      let data: any = {
        "name": this.addEventForm.value.name,
        "description": this.addEventForm.value.description,
        "sourceDirectoryPath": this.addEventForm.value.sourceDirectoryPath,
        "date": this.date
      }
      this.eventService.addEvent(data).subscribe((response) => {
        this.toastr.success('Event added successfully');
        this.detailsClientComponent.getEvents();
      });
    }
    else {
      this.toastr.error("Failed..! Please add all the datas properly");
    }
  }

}
