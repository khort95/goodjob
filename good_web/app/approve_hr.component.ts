import { Component, NgModule, OnInit, Input} from '@angular/core';
import { Company, HrPerson } from './data-class';
import { GoodJobService } from './good-job.service';


@Component({
  selector: 'hr-panel',
  templateUrl: 'app/template/hr-panel.html'
})

export class HrPanel implements OnInit {
  @Input()
  user: HrPerson
  msg: string

  @Input()
  hr_list: string[]

  constructor(private goodJobService: GoodJobService) {
  }

  ngOnInit(){

  }

    approve(email: string){
    let res: string
    this.goodJobService.approve_user_to_company(this.user.email, this.user.company, email, "approve")
    .subscribe(p => res = p, error=>this.msg = "action failed")

   var i = this.hr_list.indexOf(email)
    if (i > -1) {
      this.hr_list.splice(i, 1)
    }
  }

  reject(email: string){
    let res: string
    this.goodJobService.approve_user_to_company(this.user.email, this.user.company, email, "reject")
    .subscribe(p => res = p, error=>this.msg = "action failed")

    var i = this.hr_list.indexOf(email)
    if (i > -1) {
      this.hr_list.splice(i, 1)
    }
  }


}
