import { Component } from '@angular/core';
import { NgModule, OnInit, Input}      from '@angular/core';
import { HrPerson, Company } from './data-class';
import { GoodJobService } from './good-job.service';
import { CreateJob} from './create_job.component'

@Component({
  selector: 'settings',
  templateUrl: 'app/template/settings-page.html'
})

export class Settings implements OnInit{
  user: HrPerson = null
  company: Company
  image: any 
 
  constructor(private goodJobService: GoodJobService) {
  }

  ngOnInit(){
      this.user = this.goodJobService.get_user()
      this.company = this.goodJobService.fetch_null_company()
      this.goodJobService.fetch_company_logo( this.user.company)
        .subscribe(p=> this.company.logo = p.logo,
                   error=> console.log("failed to get company logo")
                )
  }

  changeListener(event: any) : void {
    this.readThis(event.target)
  }

  readThis(inputValue: any): void {
    var file:File = inputValue.files[0]
    var myReader:FileReader = new FileReader()

    myReader.onloadend = (e) => {
        this.image = myReader.result
        
        
        this.goodJobService.upload_logo(this.user.email, this.user.company, this.image)
        .subscribe(p=> this.success(p),
                   error=> window.alert("image failed to upload")
                )
        }
        
    myReader.readAsDataURL(file)
  }

   private success(p: any){
      window.alert("image uploaded!")
      this.company.logo = p.logo
      console.log(p)
   }

}