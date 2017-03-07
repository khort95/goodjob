import { Component, NgModule, OnInit} from '@angular/core';
import { Job } from './data-class';
import { GoodJobService } from './good-job.service';
import { CreateJob} from './create_job.component';
import { Routes } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'job-panel',
  templateUrl: 'app/template/job-panel.html'
})

export class JobPanel implements OnInit{
  job: Job 
 
  constructor(private goodJobService: GoodJobService, private route: ActivatedRoute) {
    this.job = goodJobService.fetch_null_job();
  }
  

  ngOnInit(){
   let name: string;
   let company: string; 

   this.route.params.subscribe(params => {
          name = params['name'];
          company = params['company']
        });
    
  
   this.goodJobService.fetch_job(company, name)
   .subscribe(p => this.job = p)
    console.log(this.job)
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

    console.log(res)
  }
  
}