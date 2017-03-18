
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { GoodJobService } from './good-job.service';
import { HrPerson } from './data-class';
import { NgModule }      from '@angular/core';

import { ActivatedRoute, Router} from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service'

@Component({
  selector: 'login-page',
  templateUrl: 'app/template/login-page.html'
})

export class LoginPage {
  user: HrPerson = this.goodJobService.fetch_null_hr_person()

  public loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  });

  constructor(public fb: FormBuilder, private goodJobService: GoodJobService, private router: Router, private cookie: CookieService) {
    if(this.goodJobService.get_user().role !== undefined){
      this.router.navigate(['/app'])
    }
  }

  doLogin(event: any) {
   this.goodJobService.login(this.loginForm.value.password, this.loginForm.value.email)
   .subscribe(p => this.router.navigate(['/app']), error=> this.user.name = "login error!") 
 }
 
}
