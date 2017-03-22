import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Job } from "./data-class";
 
@Injectable()
export class MessageService {
    private subject = new Subject<any>();
 
    sendJob(job: Job) {
        this.subject.next(job);
    }
 
    getJob(): Observable<Job> {
        return this.subject.asObservable();
    }
}