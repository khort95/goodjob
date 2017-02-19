
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { GoodJobService } from './good-job.service';
import { HrPerson } from './hr-person';
import { NgModule }      from '@angular/core';

import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'login-page',
  template: `
  <form [formGroup]="loginForm" (ngSubmit)="doLogin($event)">
    <div><input formControlName="email" type="email" placeholder="Your email"></div>
    <div><input formControlName="password" type="password" placeholder="Your password"></div>
  <button type="submit">Log in</button>
</form>
<div>{{user.name}}</div>

<a href="create user" [routerLink]="['/create']">create user</a>
  `
})

export class LoginPage {
  user: HrPerson = this.goodJobService.fetch_null_hr_person()
 
  public loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  });

  
  constructor(public fb: FormBuilder, private goodJobService: GoodJobService, private router: Router) {}

  doLogin(event: any) {
   // this.goodJobService.login(this.loginForm.value.password, this.loginForm.value.email)
    //this.user = this.goodJobService.get_user()
    //console.log(this.user)
    //if(this.user.name !== "error!"){this.router.navigate(['/app'])}
   
   this.goodJobService.test_login(this.loginForm.value.password, this.loginForm.value.email)
   .subscribe(p => this.router.navigate(['/app']), error=> this.user.name = "login error!")
    console.log(this.user)
  }
    
}
