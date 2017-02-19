import { Component } from '@angular/core';
import { NgModule, OnInit}      from '@angular/core';
import { HrPerson } from './hr-person';
import { Company } from './company';
import { GoodJobService } from './good-job.service';
import { CreateJob} from './create_job.component'
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'temp',
  template: `

<div>
 <h4>loading ..</h4>
</div>

  `
})

export class Temp {
 
 
  
  constructor(private router: Router) {
    this.router.navigate(['/app'])
  }
  
}