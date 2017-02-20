import { Component } from '@angular/core';
import { NgModule, OnInit}      from '@angular/core';
import { Job } from './job';
import { GoodJobService } from './good-job.service';
import { CreateJob} from './create_job.component';
import { Routes } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'job-panel',
  template: `
    <h3>Job Details</h3>
    <div>name: {{job.name}}</div>
    <div>description: {{job.description}}</div>
    <div>post date: {{job.post_date}}</div>
    <div>location: {{job.location}}</div>
    <div>salary: {{job.salary_range}}</div>
    <div>employment type: {{job.employment_type}}</div>
    
    <div>
    chats
    <ul>
    <li *ngFor="let user of job.active_chats">
      {{user}}
    </li>
    </ul>
    </div>
    
    <div>
    likes
    <ul>
    <li *ngFor="let user of job.likes">
      user
    </li>
    </ul>
    </div>
  
  `
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
  
}