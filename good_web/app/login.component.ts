
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
    <input formControlName="email" type="email" placeholder="Your email">
    <input formControlName="password" type="password" placeholder="Your password">
  <button type="submit">Log in</button>
</form>
<div>
  <h4>{{user.name}} has logged in!</h4>
</div>
<create-user>
  `
})

export class LoginPage {
  user: HrPerson = {email: "", picture: "", bio: "",  permissions: [], role: "", api_token:"", name: " error"}
 
  public loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  });

  
  constructor(public fb: FormBuilder, private goodJobService: GoodJobService, private router: Router) {}
  doLogin(event: any) {
    this.goodJobService.login(this.loginForm.value.password, this.loginForm.value.email)
    this.user = this.goodJobService.get_user()
    console.log(this.user)
    if(this.user.name !== "error!"){this.router.navigate(['/app'])}
  }
}
