import { Component } from '@angular/core';
import { NgModule, OnInit}      from '@angular/core';
import { HrPerson, Company } from './data-class';
import { GoodJobService } from './good-job.service';
import { CreateJob} from './create_job.component'
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from "./message-service";
import {Job} from "./data-class";

@Component({
  selector: 'main-page',
  templateUrl: 'app/template/main-page.html'
})

export class MainPage implements OnInit{
  user: HrPerson = null
  company: Company 
  company_name: string
  current_job_name: string = "empty"

  message: any;
  subscription: Subscription;
 
  constructor(private goodJobService: GoodJobService, private messageService: MessageService) {
    this.company = goodJobService.fetch_null_company();
    this.subscription = this.messageService.getJob().subscribe(job => this.addJob(job));
  }
  

  ngOnInit(){
    this.user = this.goodJobService.get_temp_user()

    if(this.user.role === undefined){
      console.log("getting user from cookie")
      this.user = this.goodJobService.get_user()
    }
    else{
      console.log("setting user cookie")
      this.goodJobService.setUserCookie()
    }

   this.goodJobService.fetch_company(this.user.company)
   .subscribe(p => this.setCompany(p))

  }

  ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

  private setCompany(p: Company){
    this.company = p;
    this.company_name = this.company.name
  }

  private addJob(job: Job){
    console.log(job.name + "has been added")
    this.company.jobs.push(job.name)
  }
}