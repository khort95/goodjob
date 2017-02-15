import { Component } from '@angular/core';
import { NgModule }      from '@angular/core';
import { HrPerson } from './hr-person';
import { Company } from './company';
import { GoodJobService } from './good-job.service';


@Component({
  selector: 'main-page',
  template: `

<div>
  <h4>hello {{user.name}}</h4>
  <h4>hello {{company.name}}</h4>
  <h4>hello {{company.bio}}</h4>

</div>
  `
})

export class MainPage {
  user: HrPerson = null
  company: Company = null
 
  
  constructor(private goodJobService: GoodJobService) {
    this.user = goodJobService.get_user()
    goodJobService.fetch_company(this.user.company)
    this.company = goodJobService.get_company()

  }
  
}