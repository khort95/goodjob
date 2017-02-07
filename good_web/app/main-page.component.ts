import { Component } from '@angular/core';
import { NgModule }      from '@angular/core';
import { HrPerson } from './hr-person';
import { GoodJobService } from './good-job.service';


@Component({
  selector: 'main-page',
  template: `

<div>
  <h4>hello {{user.name}}</h4>
</div>
  `
})

export class MainPage {
  user: HrPerson = null
 
  
  constructor(private goodJobService: GoodJobService) {
    this.user = goodJobService.get_user()
  }
  
}