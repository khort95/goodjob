
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { GoodJobService } from './good-job.service';
import { Job } from './data-class';
import { NgModule }      from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'create-job',
  templateUrl: 'app/template/create-job.html'
})

export class CreateJob {
  job: Job = this.goodJobService.fetch_null_job();

  public loginForm = this.fb.group({
    name: ["", Validators.required],
    description: ["", Validators.required],
    salary_range: ["", Validators.required],
    employment_type: ["", Validators.required],
    location: ["", Validators.required],
    tags: ["", Validators.required]
  });


  constructor(public fb: FormBuilder, private goodJobService: GoodJobService, private router: Router) {
    this.job.name = "create a new job!"
  }

  newJob(event: any) {
    this.job.name = this.loginForm.value.name
    this.job.company = GoodJobService.hr_person.company
    this.job.description = this.loginForm.value.description
    this.job.salary_range = this.loginForm.value.salary_range
    this.job.employment_type = this.loginForm.value.employment_type
    this.job.location = this.loginForm.value.location
    this.job.tags = this.loginForm.value.tags

    this.goodJobService.new_job(this.create(this.job))
   .subscribe(p => this.job = p, error=> this.job.name = "error creating job!")

    this.job
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
            "tags": job.tags
           }
        }

        return comp
  }
}
