
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { GoodJobService } from './good-job.service';
import { Company } from './data-class';
import { NgModule }      from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'create-company',
  templateUrl:'app/template/create-company.html'
})
export class CreateCompany {
  company: Company = this.goodJobService.fetch_null_company();
 
  public loginForm = this.fb.group({
    name: ["", Validators.required],
    logo: ["", Validators.required],
    bio: ["", Validators.required],
    link_to_website: ["", Validators.required],
    list_of_locations: ["", Validators.required]  
  });

  
  constructor(public fb: FormBuilder, private goodJobService: GoodJobService, private router: Router) {}
  newUser(event: any) {
    this.company = {name: this.loginForm.value.name, logo: "link-to-picture", bio: this.loginForm.value.bio,  list_of_locations: this.loginForm.value.list_of_locations,  link_to_website: this.loginForm.value.link_to_website, hr_manager_ids:[], jobs:[]}
    var response = this.goodJobService.create_company(this.create(this.company, this.goodJobService.get_user().email)) 
    this.router.navigate(['/start'])
  }

  create(company: Company, email: string) :any{
       let comp = 
         {
          "create": {
            "name": company.name, 
            "logo": company.logo,
            "bio": company.bio,
            "link_to_website": company.link_to_website,
            "list_of_locations":company.list_of_locations,
            "email": email
           }
        }

        return comp
  }
}
