import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// We need to import the ReactiveFormsModule and import it
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { LoginPage } from './login.component';
import { MainPage } from './main-page.component';
import { CreateUser } from './create_user.component';
import { CreateCompany } from './create_company.component';
import { CreateJob } from './create_job.component';
import { ChatWindow } from './chat.component';
import { Temp } from './temp.component';
import { JobPanel } from './job_panel.component';
import { JobSeekerPanel } from './job_seeker.component';
import { GoodJobService } from './good-job.service';

import { routing } from './app.routes';


@NgModule({
  imports: [ BrowserModule, ReactiveFormsModule, HttpModule, routing ],
  declarations: [ AppComponent, LoginPage, CreateUser, MainPage, CreateCompany, CreateJob, Temp, JobPanel, ChatWindow, JobSeekerPanel ],
  bootstrap: [ AppComponent ],
  providers: [GoodJobService]
})
export class AppModule { }
