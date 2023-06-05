import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
	{ path: "dashboard",  component: DashboardComponent, canActivate: [AuthGuard] },
	{ path: "auth", loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule) },
	{ path: "staff", canActivate: [AuthGuard], loadChildren: () => import("./modules/staff/staff.module").then(m => m.StaffModule) },
	{ path: "client", canActivate: [AuthGuard], loadChildren: () => import("./modules/client/client.module").then(m => m.ClientModule) },
	{ path: "event",  canActivate: [AuthGuard], loadChildren: () => import("./modules/event/event.module").then(m => m.EventModule) },
	{ path: "profile", canActivate: [AuthGuard], loadChildren: () => import("./modules/profile/profile.module").then(m => m.ProfileModule) },
	{
		path: "**", redirectTo: "auth"
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
