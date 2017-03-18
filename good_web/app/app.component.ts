import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { GoodJobService } from './good-job.service';

@Component({
    selector: 'my-app',
    template: `
    <button (click)="logout()">logout</button> 
    <div align="center"><h1>GoodJob</h1></div>

    <router-outlet></router-outlet>
     
    `
})
export class AppComponent { 
    constructor(private goodJobService: GoodJobService, private router: Router) {}

    logout(event: any){
        this.goodJobService.logout();
        this.router.navigate(['/start'])
    }
}
