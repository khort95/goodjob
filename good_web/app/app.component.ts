import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { GoodJobService } from './good-job.service';
import { HrPerson } from './data-class';

@Component({
    selector: 'my-app',
    template: `
    <br>

<div class="navbar">
    <button (click)="logout()">Logout</button>
    <button (click)="settings()">Settings</button>
    <img class ="Glogo" src="GoodjobJustG.png" width="50" height="38" (click)="home()" />
</div>
    <router-outlet></router-outlet>

    `
})
export class AppComponent {
    user: HrPerson
    constructor(private goodJobService: GoodJobService, private router: Router) {
        this.user = this.goodJobService.get_user()
    }

    logout(event: any){
        this.goodJobService.logout();
        this.router.navigate(['/start'])
    }

    settings(event: any){
        this.router.navigate(['/app/settings'])
    }

    home(event: any){
        this.router.navigate(['/app'])
    }
}
