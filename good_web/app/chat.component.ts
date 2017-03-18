
import { Component, NgModule, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { GoodJobService } from './good-job.service';
import { Message, Chat, Company } from './data-class';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'chat-window',
  templateUrl: 'app/template/chat-window.html' 
})

export class ChatWindow implements OnInit{
  chat: Chat 
  job_seeker: string
  company: string
  job: string
  sender: string
 
  constructor(private goodJobService: GoodJobService, private route: ActivatedRoute, public fb: FormBuilder) {
    this.chat = goodJobService.fetch_null_chat();
  }

  sendMessage(event: any) {
   let msg: string = this.send_message.value.message
   this.send_message.controls['message'].setValue("");
    
    this.goodJobService.send_message(this.sender, this.job_seeker, this.company, this.job, msg)
      .subscribe(p => this.chat = p)
       console.log(this.chat)
  }
  

  ngOnInit(){

   this.route.params.subscribe(params => {
          this.job_seeker = params['job_seeker']
          this.company = params['company']
          this.job = params['job']
          this.sender = this.goodJobService.get_user().email
        });
    
  
   this.goodJobService.fetch_chat(this.job_seeker, this.company, this.job)
   .subscribe(p => this.chat = p)
    console.log(this.chat)
  }

   public send_message = this.fb.group({
    message: ["", Validators.required]   
  });
}