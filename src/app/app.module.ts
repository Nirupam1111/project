import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './ui-element/footer/footer.component';
import { HeaderComponent } from './ui-element/header/header.component';
import { SidebarComponent } from './ui-element/sidebar/sidebar.component';
import { WebServiceInterceptor } from './web-service.interceptor';
import { NgOtpInputModule } from  'ng-otp-input';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 5000,
      positionClass: 'toast-top-right',
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    NgOtpInputModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: WebServiceInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }


