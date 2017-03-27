import { Component, NgModule, OnInit, Input} from '@angular/core';
import { Job } from './data-class';
import { GoodJobService } from './good-job.service';
import { CreateJob} from './create_job.component';
import { Routes } from '@angular/router';
import { MessageService } from "./message-service";


@Component({
  selector: 'job-panel',
  templateUrl: 'app/template/job-panel.html'
})

export class JobPanel implements OnInit{
  @Input()
  name: string;

  @Input()
  company: string;

  strId: string;
  strIdH: string;
  static counter: number = 0;


  job: Job

  constructor(private goodJobService: GoodJobService, private messageService: MessageService) {
    this.job = goodJobService.fetch_null_job()
    JobPanel.counter++;
    let id = JobPanel.counter;
    this.strId = "collapse"+id;
    this.strIdH = "#collapse"+id;
  }


  ngOnInit(){
   if(this.company != undefined && this.name != undefined){
    this.goodJobService.fetch_job(this.company, this.name).subscribe(p => this.job = p)
  }
  }

  approve(user: string){
    let res: string

    this.goodJobService.approve_user(this.job.name, this.job.company, user, true)
    .subscribe(p => res = p, error=>this.job.name = "action failed")

    var i = this.job.likes.indexOf(user)
    if (i > -1) {
      this.job.likes.splice(i, 1)
      this.job.active_chats.push(user)
    }

    console.log(res)
  }

  reject(user: string){
    let res: string

    this.goodJobService.approve_user(this.job.name, this.job.company, user, false)
    .subscribe(p => res = p, error=>this.job.name = "action failed")

    var i = this.job.likes.indexOf(user)
    if (i > -1) {
      this.job.likes.splice(i, 1)
    }
  }
   
  profileClick(email: string){
    this.messageService.sendProfileClick(email)
  }

  chatClick(job_seeker: string, company: string, job: string){
    this.messageService.sendProfileClick(job_seeker)
    this.messageService.sendChatClick(job_seeker, company,job)
  } 
}
