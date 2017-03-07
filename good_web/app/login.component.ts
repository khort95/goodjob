
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { GoodJobService } from './good-job.service';
import { HrPerson } from './data-class';
import { NgModule }      from '@angular/core';

import { ActivatedRoute, Router} from '@angular/router';


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

  constructor(public fb: FormBuilder, private goodJobService: GoodJobService, private router: Router) {}

  doLogin(event: any) {
   this.goodJobService.login(this.loginForm.value.password, this.loginForm.value.email)
   .subscribe(p => this.router.navigate(['/app']), error=> this.user.name = "login error!")
    console.log(this.user)
  }
}
