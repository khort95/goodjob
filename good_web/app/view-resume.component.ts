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
  templateUrl: 'app/template/view-resume-page.html'
})

export class ViewResume{
  email: string
  resume: any
 
  constructor(private goodJobService: GoodJobService, private route:ActivatedRoute) {
  }

  ngOnInit(){
    // need to url encode email address
    //se!phildimarco%40gmail!com
    this.email = this.route.snapshot.params['email'];
    this.email = this.email.replace(new RegExp("!", 'g'), ".")

    //make test for base64 so bad things don't load
    this.goodJobService.show_resume(this.email).subscribe(r=> this.draw_window(r.resume), error=>this.resume="no resume found")
}

draw_window(pdf: string){
  try{
    window.location.href = pdf
  }
  catch(err){
    this.email = "error loading resume"
  }
}

}