
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { GoodJobService } from './good-job.service';
import { Company, CompanyView } from './data-class';
import { NgModule }      from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { AppModule } from './app.module';

@Component({
  selector: 'create-company',
  templateUrl:'app/template/create-company.html'
})
export class CreateCompany {
  company: Company = this.goodJobService.fetch_null_company();
  new_company: boolean
  company_entered: string
  status_msg: string
  companyView: CompanyView
  company_found_: boolean

  public loginForm = this.fb.group({
    name: ["", Validators.required],
    bio: ["", Validators.required],
    link_to_website: ["", Validators.required],
    list_of_locations: ["", Validators.required]
  });


  constructor(public fb: FormBuilder, private goodJobService: GoodJobService, private router: Router) {
      this.company.name = undefined
  }
  newUser(event: any) {
    this.company = {name: this.loginForm.value.name, logo: "link-to-picture", bio: this.loginForm.value.bio,  list_of_locations: this.loginForm.value.list_of_locations,  link_to_website: this.loginForm.value.link_to_website, hr_manager_ids:[], jobs:[]}
    var response = this.goodJobService.create_company(this.create(this.company, this.goodJobService.get_temp_user().email))
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

  yes_company(){
    this.new_company= true
  }

  no_company(){
    this.new_company = false
  }

  search_company(){
    console.log(this.company_entered)
      this.goodJobService.fetch_company_view(this.company_entered)
   .subscribe(comp => this.company_found(comp), error=> this.company_not_found())
  }

  company_found(companyView: CompanyView){
    this.company_found_ = true
    this.companyView = companyView
    this.status_msg = "If this is your company please click confirm"
  }

  company_not_found(){
    this.status_msg="company not found try again"
    this.company_found_ = false

  }

  send_user_to_company(){
    console.log("sending " + this.company_entered+" "+ this.goodJobService.get_temp_user().email)
    //this.send_user_to_company(this.company_entered, this.goodJobService.get_temp_user().email
    this.goodJobService.add_user_to_company(this.company_entered, this.goodJobService.get_temp_user().email)
    .subscribe(ok => this.router.navigate(['/start']), error=>this.status_msg="error adding you to the company")
  }

}
