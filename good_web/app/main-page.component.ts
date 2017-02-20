import { Component } from '@angular/core';
import { NgModule, OnInit}      from '@angular/core';
import { HrPerson } from './hr-person';
import { Company } from './company';
import { GoodJobService } from './good-job.service';
import { CreateJob} from './create_job.component'


@Component({
  selector: 'main-page',
  template: `

<div>
  <h4>hello {{user.name}}</h4>
  <h3>Company: {{company.name}}</h3>
</div>

  <h2>Jobs</h2>
  <div>
  <ul>
    <li *ngFor="let job of company.jobs">
      <a href= "#" [routerLink]="['/app/job', job, company.name]">
      {{job}}
      </a>
    </li>
  </ul>
  </div>

  <div>
    <h3>Add Job</h3>
    <create-job></create-job>
  </div>
  `
})

export class MainPage implements OnInit{
  user: HrPerson = null
  company: Company 
 
 
  
  constructor(private goodJobService: GoodJobService) {
    this.company = goodJobService.fetch_null_company();
  }
  

  ngOnInit(){
   this.user = this.goodJobService.get_user()
   this.goodJobService.fetch_company(this.user.company)
   .subscribe(p => this.company = p)
    console.log(this.company)
  }

  
}