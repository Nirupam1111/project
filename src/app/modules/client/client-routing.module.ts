import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsClientComponent } from './details-client/details-client.component';
import { ListClientComponent } from './list-client/list-client.component';

const routes: Routes = [
  { path: "", component: ListClientComponent },
  { path: ":id", component: DetailsClientComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule,
  ]
})
export class ClientRoutingModule { }
