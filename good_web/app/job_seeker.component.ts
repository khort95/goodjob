import { Component, NgModule, OnInit} from '@angular/core';
import { JobSeekerProfile } from './data-class';
import { GoodJobService } from './good-job.service';
import { CreateJob} from './create_job.component';
import { Routes } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'job-seeker-profile',
  template: `
    <h3>{{user.name}}</h3>
    <div>bio: {{user.bio}}</div>
    <div>picture goes here <div>
    <div>resume: {{user.resume}}</div>
    <div>tags: {{user.tags}}</div>
  `
})

export class JobSeekerPanel implements OnInit{
  user: JobSeekerProfile 
 
  constructor(private goodJobService: GoodJobService, private route: ActivatedRoute) {
    this.user = goodJobService.fetch_null_job_seeker_profile();
  }
  

  ngOnInit(){
   let email: string;

   this.route.params.subscribe(params => {
          email = params['email']
        });
    
  
   this.goodJobService.fetch_job_seeker_profile(email)
   .subscribe(p => this.user = p)
    console.log(this.user)
  }
  
}