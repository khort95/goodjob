
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { GoodJobService } from './good-job.service';
import { HrPerson } from './data-class';
import { NgModule }      from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'create-user',
  templateUrl:'app/template/create-user.html'
})
export class CreateUser {
  user: HrPerson = {
    email: "", 
    picture: "", 
    bio: "",  
    permissions: [], 
    role: "", 
    name: undefined,
    company:""
  }
 
  public loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
    name: ["", Validators.required],
    bio: ["", Validators.required],
    role: ["", Validators.required]    
  });

  //add subscriber thing
  constructor(public fb: FormBuilder, private goodJobService: GoodJobService, private router: Router) {}
  newUser(event: any) {
    console.log("new user event")
    this.user = {email: this.loginForm.value.email, picture: "no-picture", bio: this.loginForm.value.bio,  permissions: [], role: this.loginForm.value.role, name: this.loginForm.value.name, company: ""}

    this.goodJobService.create_user(this.create(this.user, this.loginForm.value.password)).subscribe(okay=>this.create_company_page(), error=>this.user.name ="error creating user")
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

  create_company_page(){
      this.router.navigate(['/company'])
  }
}
