import { Component } from '@angular/core';
import { NgModule, OnInit}      from '@angular/core';
import { HrPerson, Company } from './data-class';
import { GoodJobService } from './good-job.service';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from "./message-service";
import {Job} from "./data-class";

@Component({
  selector: 'main-page',
  templateUrl: 'app/template/main-page.html',
  host: {
        '(window:scroll)': 'updateHeader($event)'
    }
})

export class MainPage implements OnInit{
  user: HrPerson = null
  company: Company
  company_name: string
  current_job_name: string = "empty"
  profile_click: boolean = false
  chat_click: boolean = false
  show_page: boolean
  new_hr_managers: boolean = false
  hr_approve_list: string[]

  current_chat: string
  current_profile: string

  message: any;
  add_job: Subscription;
  profile_click_sub: Subscription;
  chat_click_sub: Subscription;
  delete_job_sub: Subscription;

  is_scrolled = false;
  currPos: number = 0;
  startPos: number = 0;
  changePos: number = 100;
  font_size: number = 60;

  constructor(private goodJobService: GoodJobService, private messageService: MessageService) {
    this.company = goodJobService.fetch_null_company();
    this.add_job = this.messageService.getJob().subscribe(job => this.addJob(job));
    this.profile_click_sub = this.messageService.getProfileClick().subscribe(email=>this.drawProfile(email));
    this.chat_click_sub = this.messageService.getChatClick().subscribe(chat=>this.drawChat(chat));
    this.delete_job_sub = this.messageService.getDeleteJob().subscribe(job=>this.deleteJob(job))
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

   if(this.user.company != "nil"){
   this.show_page = true
   this.goodJobService.fetch_company(this.user.company)
   .subscribe(p => this.setCompany(p))
  }
  else{
    this.show_page = false
  }

  }

  ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.add_job.unsubscribe();
        this.chat_click_sub.unsubscribe();
        this.profile_click_sub.unsubscribe();
        this.delete_job_sub.unsubscribe();
    }

  private setCompany(p: Company){
    this.company = p;
    this.company_name = this.company.name
    if(this.user.head){this.canApproveHrManager()}
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

  private deleteJob(job: string){
     console.log(job + "has been removed")
      var index = this.company.jobs.indexOf(job)

      if (index > -1) {
         this.company.jobs.splice(index, 1);
      }
  }

  updateHeader(evt: any) {
        let tracker = evt.target;
        let limit = tracker.scrollHeight - tracker.clientHeight;
        
        this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
        if(this.currPos >= this.changePos + 75 ) {
            //this.is_scrolled = true;
            //console.log("scrolled " + this.font_size)
            if(this.font_size > 0){this.font_size = this.font_size - 2;}
        }
        else if(this.currPos > this.changePos + 70 && this.currPos < this.changePos + 140){} 
        else {
            if(this.font_size < 60){this.font_size = this.font_size + 2;}
        }
    }

    canApproveHrManager(){
      var email_list: string[] = [];
      for(let i in this.company.hr_manager_ids){
        var person = this.company.hr_manager_ids[i]
        var email = Object.keys(person)[0]
    
        if(person[email] == false){
          email_list.push(email)
        }
      }
       //console.log(email_list)
       if(email_list.length > 0){
         this.hr_approve_list = email_list
         this.new_hr_managers = true;
       }
    }
}
// Close the dropdown menu if the user clicks outside of it
