import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { GoodJobService } from './good-job.service';
import { HrPerson } from './data-class';

@Component({
    selector: 'my-app',
    templateUrl:'app/template/header.html'
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
