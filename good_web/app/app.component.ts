import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <div align="center"><h1>GoodJob</h1></div>

    <router-outlet></router-outlet>
    `
})
export class AppComponent { }
