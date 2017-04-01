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
  @Input()
  company: Company
  image: any 
 
  constructor(private goodJobService: GoodJobService) {
  }

  ngOnInit(){
      this.user = this.goodJobService.get_user()
  }

  changeListener(event: any) : void {
    this.readThis(event.target)
  }

  readThis(inputValue: any): void {
    var file:File = inputValue.files[0]
    var myReader:FileReader = new FileReader()

    myReader.onloadend = (e) => {
        this.image = myReader.result
        
        
        this.goodJobService.upload_picture(this.user.email, this.image)
        .subscribe(p=> this.success(p),
                   error=> window.alert("image failed to upload")
                )
        }
        
    myReader.readAsDataURL(file)
  }

   private success(p: any){
      window.alert("image uploaded!")
      this.user = p
   }

}