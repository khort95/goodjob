import { Component, NgModule, OnInit, Input} from '@angular/core';
import { JobSeekerProfile } from './data-class';
import { GoodJobService } from './good-job.service';
import { CreateJob} from './create_job.component';
import { Routes } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from "./message-service";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'job-seeker-profile',
  templateUrl: 'app/template/job-seeker-profile.html'
})

export class JobSeekerPanel{
  user: JobSeekerProfile
  profile_click_sub: Subscription;
  
  @Input()
  email: string; 
 
  constructor(private goodJobService: GoodJobService, private messageService: MessageService) {
    this.user = goodJobService.fetch_null_job_seeker_profile();
    this.profile_click_sub = this.messageService.getProfileClick().subscribe(email=>this.fetch_profile(email));
  }

    ngOnInit(){
      console.log(this.email + "  email")
    
      if(this.email != undefined){
        this.fetch_profile(this.email)
      }
    }

  
  fetch_profile(email: string){
    console.log("click" + email)
    this.goodJobService.fetch_job_seeker_profile(email)
      .subscribe(p => this.user = p)
  }

   ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.profile_click_sub.unsubscribe();
    }

}