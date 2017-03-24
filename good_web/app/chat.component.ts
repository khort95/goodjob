
import { Component, NgModule, OnInit, Input} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { GoodJobService } from './good-job.service';
import { Message, Chat, Company } from './data-class';
import { MessageService } from "./message-service";

@Component({
  selector: 'chat-window',
  templateUrl: 'app/template/chat-window.html' 
})

export class ChatWindow implements OnInit{
  chat: Chat 
  @Input()
  chat_data: any
  job_seeker: string
  company: string
  job: string
  sender: string
 
  constructor(private goodJobService: GoodJobService, public fb: FormBuilder, private messageService: MessageService) {
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

    if(this.chat_data != undefined){
      this.job_seeker = this.chat_data.job_seeker
      this.company = this.chat_data.company
      this.job = this.chat_data.job
      this.sender = this.goodJobService.get_user().email
      
     this.goodJobService.fetch_chat(this.job_seeker, this.company, this.job)
     .subscribe(p => this.chat = p)
      console.log(this.chat)
  }
  }

   public send_message = this.fb.group({
    message: ["", Validators.required]   
  });
}