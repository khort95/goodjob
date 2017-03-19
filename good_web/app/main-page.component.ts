import { Component } from '@angular/core';
import { NgModule, OnInit}      from '@angular/core';
import { HrPerson, Company } from './data-class';
import { GoodJobService } from './good-job.service';
import { CreateJob} from './create_job.component'

@Component({
  selector: 'main-page',
  templateUrl: 'app/template/main-page.html'
})

export class MainPage implements OnInit{
  user: HrPerson = null
  company: Company 
 
 
  
  constructor(private goodJobService: GoodJobService) {
    this.company = goodJobService.fetch_null_company();
  }
  

  ngOnInit(){
    this.user = this.goodJobService.get_temp_user()

    if(this.user.role === undefined){
      console.log("getting user from cookie")
      this.user = this.goodJobService.get_user()
    }
    else{
      console.log("setting user cookie")
      this.goodJobService.setUserCookie()
    }

   this.goodJobService.fetch_company(this.user.company)
   .subscribe(p => this.company = p)
  }
}