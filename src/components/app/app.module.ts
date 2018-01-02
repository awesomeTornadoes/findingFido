/*Defines AppModule, the root module that tells Angular how to assemble the application. */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module'
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { EmailService } from './services/email.service';
import { AuthService } from './auth/auth.service';
import { ChatService } from './services/chat.service';
import { PageService } from './services/page.service';
import { LoginComponent } from './login/login.component';
import { PersonComponent } from './person-signup/person-signup.component';
import { PetComponent } from './pet-signup/pet-signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonBooleanComponent } from './person-boolean/person-boolean.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PetDashboardComponent } from './pet-dashboard/pet-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ReviewComponent } from './review/review.component';
import { PetBooleanComponent } from './pet-boolean/pet-boolean.component';
import { ChatComponent } from './chat/chat2.component';
import { PageNotFoundComponent } from './page-not-found'
import { CallbackComponent } from './callback.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PersonComponent,
    PersonBooleanComponent,
    PetComponent,
    DashboardComponent,
    ScheduleComponent,
    PetDashboardComponent,
    PetBooleanComponent,
    ProfileComponent,
    ReviewComponent,
    ChatComponent,
    CallbackComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBfz7Y7C-7emBWPSEi925MBpeXLRcL-Jzw'
    })
  ],
  providers: [
    AuthService, PageService, EmailService, ChatService,
    AuthHttp,
    provideAuth({
      headerName: 'Authorization',
      headerPrefix: 'bearer',
      tokenName: 'token',
      tokenGetter: (() => localStorage.getItem('access_token')),
      globalHeaders: [{ 'Content-Type': 'application/json' }],
      noJwtError: true
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

