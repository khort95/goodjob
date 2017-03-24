import { Component, NgModule, OnInit, Input} from '@angular/core';
import { JobSeekerProfile } from './data-class';
import { GoodJobService } from './good-job.service';
import { CreateJob} from './create_job.component';
import { Routes } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from "./message-service";


@Component({
  selector: 'job-seeker-profile',
  templateUrl: 'app/template/job-seeker-profile.html'
})

export class JobSeekerPanel implements OnInit{
  user: JobSeekerProfile
  
  @Input()
  email: string; 
 
  constructor(private goodJobService: GoodJobService, private messageService: MessageService) {
    this.user = goodJobService.fetch_null_job_seeker_profile();
  }
  

  ngOnInit(){
 
    
  if(this.email != undefined){
   this.goodJobService.fetch_job_seeker_profile(this.email)
   .subscribe(p => this.user = p)
  }
  }
  
}