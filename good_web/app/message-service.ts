import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Job } from "./data-class";
 
@Injectable()
export class MessageService {
    private subject = new Subject<any>();
    private email = new Subject<any>();
    private chat = new Subject<any>();
 
    sendJob(job: Job) {
        this.subject.next(job);
    }
 
    getJob(): Observable<Job> {
        return this.subject.asObservable();
    }

    sendProfileClick(email: string){
        this.email.next(email)
    }

    getProfileClick(): Observable<string>{
        return this.email.asObservable();
    }

    sendChatClick(job_seeker: string, company: string, job: string){
        this.chat.next({job_seeker: job_seeker, company: company, job: job})
    }

    getChatClick(): Observable<any>{
        return this.chat.asObservable();
    }
}