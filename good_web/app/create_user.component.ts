
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { GoodJobService } from './good-job.service';
import { HrPerson } from './hr-person';
import { NgModule }      from '@angular/core';

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
    api_token:"temp", 
    name: " error"
  }
 
  public loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
    name: ["", Validators.required],
    company: ["", Validators.required],
    bio: ["", Validators.required],
    role: ["", Validators.required]    
  });

  
  constructor(public fb: FormBuilder, private goodJobService: GoodJobService) {}
  newUser(event: any) {
    this.user = {email: this.loginForm.value.email, picture: "link-to-picture", bio: this.loginForm.value.bio,  permissions: [], role: this.loginForm.value.role, api_token:"", name: this.loginForm.value.name}
    var response = this.goodJobService.create_user(this.create(this.user, this.loginForm.value.password))
    console.log(this.user)
  }

  create(user: HrPerson, password: string) :any{
       let hr = 
         {
          "hr_person": {
            "email": user.email,
            "name": user.name,
            "password": password,
            "bio": user.bio,
            "picture": user.picture,
            "role": user.role,
            "is_head_hr_manager":"false",
            "permissions": user.permissions,
            "api_token": "temp"
           }
        }

        return hr
  }
}
