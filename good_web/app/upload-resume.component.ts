import { Component} from '@angular/core';
import { NgModule, OnInit}      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HrPerson, Company } from './data-class';
import { GoodJobService } from './good-job.service';
import { CreateJob} from './create_job.component'
import { ActivatedRoute } from '@angular/router';
import { AppModule } from './app.module';

@Component({
  selector: 'settings',
  templateUrl: 'app/template/upload-resume-page.html'
})

export class UploadResume{
  email: string
  password: string
  resume: string
  done: boolean =false
 
  constructor(private goodJobService: GoodJobService, private route:ActivatedRoute) {
  }

  ngOnInit(){
    // need to url encode email address
    //se!phildimarco%40gmail!com
    this.email = this.route.snapshot.params['email'];
    this.email = this.email.replace(new RegExp("!", 'g'), ".")
}


  changeListener(event: any) : void {
    this.readThis(event.target)
  }

  readThis(inputValue: any): void {
    var file:File = inputValue.files[0]
    var myReader:FileReader = new FileReader()

    if(this.password == undefined){
      window.alert("please enter you password")
    }
    else{
      myReader.onloadend = (e) => {
          this.resume = myReader.result
          
          
          this.goodJobService.upload_resume(this.email, this.password, this.resume)
          .subscribe(p=> this.success(p),
                    error=> window.alert("resume failed to upload")
                  )
          }
        
     myReader.readAsDataURL(file)
    }
  }

   private success(p: any){
      window.alert("resume uploaded!")
   }

}