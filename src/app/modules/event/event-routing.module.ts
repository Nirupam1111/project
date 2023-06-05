import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './add-event/add-event.component';
import { EventListComponent } from './event-list/event-list.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { DetailsEventComponent } from './details-event/details-event.component';

const routes: Routes = [
  { path: "", component: EventListComponent },
  { path: "new", component: AddEventComponent },
  { path: "modify/:id", component: UpdateEventComponent },
  { path: ":id", component: DetailsEventComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
