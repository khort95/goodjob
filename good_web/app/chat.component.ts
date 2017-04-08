
import { Component, NgModule, OnInit, Input, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { GoodJobService } from './good-job.service';
import { Message, Chat, Company, HrPerson } from './data-class';
import { MessageService } from "./message-service";
import { Subscription } from 'rxjs/Subscription';
import { PhoenixChannelService } from './phoenix.channels.service'

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
  sender_name: string
  
  chat_click_sub: Subscription
  channel: any

  phoenixChannel: PhoenixChannelService

  //for chat scrolling
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

 
  constructor(private goodJobService: GoodJobService, public fb: FormBuilder, private messageService: MessageService, phoenixChannel: PhoenixChannelService) {
    this.phoenixChannel = phoenixChannel
    this.chat = goodJobService.fetch_null_chat();
    this.chat_click_sub = this.messageService.getChatClick().subscribe(chat=>this.update_chat_window(chat));
  }

    ngOnInit(){
      if(this.chat_data != undefined){
        this.job_seeker = this.chat_data.job_seeker
        this.company = this.chat_data.company
        this.job = this.chat_data.job
        
        this.sender = this.goodJobService.get_user().email
        this.sender_name = this.goodJobService.get_user().name

        this.goodJobService.fetch_chat(this.job_seeker, this.company, this.job)
          .subscribe(p => this.chat = p)
        console.log(this.chat)

        this.phoenixChannel.socket.connect()
        console.log('Constructed')
        let channel_name: string = "chat:" + this.job_seeker + "&&"+ this.chat_data.company + "&" + this.chat_data.job
         console.log('Constructed' + channel_name)
        console.log(channel_name)
        this.channel = this.phoenixChannel.socket.channel(channel_name)
        
        this.channel.on("new_message", (msg: any) => this.add_message(msg) )

        this.channel.join()
          .receive("ok", (messages: any) => console.log("catching up", messages) )      .receive("error", ({reason}) => console.log("failed join", reason) )
          .receive("timeout", () => console.log("Networking issue. Still waiting...") )
          
        this.scrollToBottom();
    }
    
  }

  sendMessage(event: any) {
   let msg: string = this.send_message.value.message
   this.send_message.controls['message'].setValue("");
    
    this.goodJobService.send_message(this.sender, this.job_seeker, this.company, this.job, msg)
      .subscribe(p => console.log("message sent"))
       //console.log(this.chat)
       
    this.send_message_channel(msg)
  }

  send_message_channel(msg: string){
    let send = this.goodJobService.create_new_message(this.sender, this.sender_name,  msg)
    this.channel.push("chat_send", {content: send})
  }

   public send_message = this.fb.group({
    message: ["", Validators.required]   
  });

  public update_chat_window(chat: any){
    this.job_seeker = chat.job_seeker
    this.company = chat.company
    this.job = chat.job
    this.sender = this.goodJobService.get_user().email

    this.goodJobService.fetch_chat(this.job_seeker, this.company, this.job)
     .subscribe(p => this.chat = p)
  }

  private add_message(message: any){
    this.chat.messages.push(<Message>message)
    console.log(message)
  }


  //chat scrolling stuff
    ngAfterViewChecked() {        
        this.scrollToBottom();        
    } 

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
    }
}