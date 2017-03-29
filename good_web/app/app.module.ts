import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// We need to import the ReactiveFormsModule and import it
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { LoginPage } from './login.component';
import { MainPage } from './main-page.component';
import { CreateUser } from './create_user.component';
import { CreateCompany } from './create_company.component';
import { CreateJob } from './create_job.component';
import { ChatWindow } from './chat.component';
import { Settings } from './settings.component';
import { JobPanel } from './job_panel.component';
import { JobSeekerPanel } from './job_seeker.component';
import { UploadResume } from './upload-resume.component';
import { ViewResume } from './view-resume.component';
import { GoodJobService } from './good-job.service';

import { routing } from './app.routes';
import { CookieService } from 'angular2-cookie/services/cookies.service'
import { MessageService } from "./message-service";


@NgModule({
  imports: [ BrowserModule, ReactiveFormsModule, HttpModule, routing, FormsModule ],
  declarations: [ AppComponent, LoginPage, CreateUser, MainPage, CreateCompany, CreateJob, Settings, JobPanel, ChatWindow, JobSeekerPanel, UploadResume, ViewResume],
  bootstrap: [ AppComponent ],
  providers: [GoodJobService, CookieService, MessageService]
})
export class AppModule { }
