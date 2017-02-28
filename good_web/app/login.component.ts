
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { GoodJobService } from './good-job.service';
import { HrPerson } from './hr-person';
import { NgModule }      from '@angular/core';

import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'login-page',
  template: `
  <div class="error" align=center>
  {{user.name}}
  </div>
  <div style="line-height:50%">"
    <br>
  </div>
  <form [formGroup]="loginForm" (ngSubmit)="doLogin($event)">
    <div align = center><input formControlName="email" type="email" placeholder="Enter Email"></div>
    <div align = center><input formControlName="password" type="password" placeholder="Enter Password"></div>
    <br>
  <div align=center><button type="submit">Log In</button></div>
  <div style="line-height:50%;">
    <br>
</div>
  <div align=center><a href="create user" [routerLink]="['/create']"><button class="createbutton">Create User</button></a></div>
</form>



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
