import { Component, NgModule, OnInit} from '@angular/core';
import { JobSeekerProfile } from './data-class';
import { GoodJobService } from './good-job.service';
import { CreateJob} from './create_job.component';
import { Routes } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'job-seeker-profile',
  templateUrl: 'app/template/job-seeker-profile.html'
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