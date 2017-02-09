
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { GoodJobService } from './good-job.service';
import { HrPerson } from './hr-person';
import { NgModule }      from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'create-user',
  template: `
  <form [formGroup]="loginForm" (ngSubmit)="newUser($event)">
    <input formControlName="email" type="email" placeholder="Your email">
    <input formControlName="password" type="password" placeholder="Your password">
    <input formControlName="name" type="name" placeholder="Your name">
    <input formControlName="company" type="company" placeholder="Your company">
    <input formControlName="bio" type="bio" placeholder="A shot desciprtion of yourself">
    <input formControlName="role" type="role" placeholder="Your role at your company">
  <button type="submit">create!</button>
</form>
<div>
  <h4>{{user.name}} has been create!</h4>
</div>
  `
})
export class CreateUser {
  user: HrPerson = {
    email: "", 
    picture: "", 
    bio: "",  
    permissions: [], 
    role: "", 
    name: " error",
    company:""
  }
 
  public loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
    name: ["", Validators.required],
    company: ["", Validators.required],
    bio: ["", Validators.required],
    role: ["", Validators.required]    
  });

  
  constructor(public fb: FormBuilder, private goodJobService: GoodJobService, private router: Router) {}
  newUser(event: any) {
    this.user = {email: this.loginForm.value.email, picture: "link-to-picture", bio: this.loginForm.value.bio,  permissions: [], role: this.loginForm.value.role, name: this.loginForm.value.name, company: ""}
    var response = this.goodJobService.create_user(this.create(this.user, this.loginForm.value.password))
    this.router.navigate(['/start'])
  }

  create(user: HrPerson, password: string) :any{
       let hr = 
         {
          "create": {
            "email": user.email,
            "name": user.name,
            "password": password,
            "bio": user.bio,
            "picture": user.picture,
            "role": user.role,
            "permissions": user.permissions,
           }
        }

        return hr
  }
}
