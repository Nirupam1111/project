import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { AuthGuard } from '../../_guards/auth.guard';

const routes: Routes = [
    { path: "", component: StaffProfileComponent },
    { path: "business", canActivate: [AuthGuard], component: BusinessProfileComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule,
    ]
})
export class ProfileRoutingModule { }
