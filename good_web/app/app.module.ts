import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// We need to import the ReactiveFormsModule and import it
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { LoginPage } from './login.component';
import { GoodJobService } from './good-job.service';


@NgModule({
  imports: [ BrowserModule, ReactiveFormsModule, HttpModule],
  declarations: [ AppComponent, LoginPage],
  bootstrap: [ AppComponent ],
  providers: [GoodJobService]
})
export class AppModule { }
