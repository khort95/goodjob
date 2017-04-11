
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { GoodJobService } from './good-job.service';
import { Job } from './data-class';
import { NgModule }      from '@angular/core';
import { MessageService } from "./message-service";

@Component({
  selector: 'create-job',
  templateUrl: 'app/template/create-job.html'
})

export class CreateJob {
  job: Job = this.goodJobService.fetch_null_job();
  choices: string[] = ["part-time", "full-time", "seasonal", "salary"]
  selectedValue: string;
 
  public loginForm = this.fb.group({
    name: ["", Validators.required],
    description: ["", Validators.required],
    salary_range: ["", Validators.required],
    location: ["", Validators.required],
    tags: ["", Validators.required]    
  });

  
  constructor(public fb: FormBuilder, private goodJobService: GoodJobService, private messageService: MessageService) {
    this.job.name = "create a new job!"
  }

  newJob(event: any) {
    this.job.name = this.loginForm.value.name
    this.job.company = this.goodJobService.get_user().company
    this.job.description = this.loginForm.value.description
    this.job.salary_range = this.loginForm.value.salary_range
    this.job.location = this.loginForm.value.location
    this.job.tags = []

    this.goodJobService.new_job(this.create(this.job))
   .subscribe(job => this.push_new_job(job), error=> this.job.name = "error creating job!")
  }

  create(job: Job) :any{
       let comp = 
         {
          "new": {
            "company": job.company,
            "name": job.name, 
            "description": job.description,
            "salary_range": job.salary_range,
            "employment_type": job.employment_type,
            "location":job.location,
            "tags": this.make_tag_list(this.loginForm.value.tags)
           }
        }

        return comp
  }

  make_tag_list(str: string) :string[] {
    return str.split(", ")
  }

  //sends a job so main panel can add it
  push_new_job(job: Job){
    this.loginForm.reset()
    console.log("sending job")
    this.messageService.sendJob(job)
  }

  seeVal(){
      var e: any = document.getElementById("test");
      var val = e.options[e.selectedIndex].value;
      this.job.employment_type = val
      console.log(val)
  }
}

