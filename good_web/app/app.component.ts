import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <br>
    <br>
    <br>
    <br>
    <div class="logo" align=center>
    <img src="GoodJob LogogoFull.png" height="250" width="550">
    </div>
  <div class="navbar">
      <a href="#home">Home</a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
        <a href="#"><button class="logout">Logout</button></a>
      <div class="logonav"><img src="GoodJob LogogoJustG.png" height="50" width="55"></div>
    </div>

    <router-outlet></router-outlet>
    `
})
export class AppComponent { }
