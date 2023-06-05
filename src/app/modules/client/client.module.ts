import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';
import { MessageModule } from '../../ui-element/message/message.module';
import { AddClientComponent } from './add-client/add-client.component';
import { ClientRoutingModule } from './client-routing.module';
import { DetailsClientComponent } from './details-client/details-client.component';
import { ListClientComponent } from './list-client/list-client.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { AddEventComponent } from './details-client/add-event/add-event.component';
import { EventModule } from '../event/event.module';

@NgModule({
  declarations: [
    ListClientComponent,
    UpdateClientComponent,
    AddClientComponent,
    DetailsClientComponent,
    AddEventComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MessageModule,
    EventModule
  ],
})
export class ClientModule { }
