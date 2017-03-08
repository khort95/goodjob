import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <div class = "main" align="center"><h1>GoodJob</h1></div>
    <div class="navbar">
      <a href="#home">Home</a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
    </div>
    <router-outlet></router-outlet>
    `
})
export class AppComponent { }
