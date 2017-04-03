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
  profile_click: boolean = false;
  chat_click: boolean = false;

  current_chat: string
  current_profile: string

  message: any;
  add_job: Subscription;
  profile_click_sub: Subscription;
  chat_click_sub: Subscription;

  constructor(private goodJobService: GoodJobService, private messageService: MessageService) {
    this.company = goodJobService.fetch_null_company();
    this.add_job = this.messageService.getJob().subscribe(job => this.addJob(job));
    this.profile_click_sub = this.messageService.getProfileClick().subscribe(email=>this.drawProfile(email));
    this.chat_click_sub = this.messageService.getChatClick().subscribe(chat=>this.drawChat(chat));
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
        this.add_job.unsubscribe();
        this.chat_click_sub.unsubscribe();
        this.profile_click_sub.unsubscribe();
    }

  private setCompany(p: Company){
    this.company = p;
    this.company_name = this.company.name
  }

  private addJob(job: Job){
    console.log(job.name + "has been added")
    this.company.jobs.push(job.name)
  }

  private drawProfile(email: string){
    this.current_profile = email
    this.chat_click = false
    this.profile_click = true
  }

   private drawChat(chat: any){
    this.current_chat = chat
    this.current_profile = chat.job_seeker
    this.chat_click = true
    this.profile_click = true

    console.log(this.current_profile)
    console.log(this.current_chat)
  }
}
