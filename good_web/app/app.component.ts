import { Component } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Request, Response } from '@angular/http';
export class User {
  username: string;
  password: string;
}
@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <h2>Hello {{user.username}}</h2>
    <div>
      <label>username </label>
      <input [(ngModel)]="user.username" placeholder="name">
    </div>
      <div>
      <label>password </label>
      <input [(ngModel)]="user.password" placeholder="name">
    </div>

    <button (click)="clicked($event)">Submit</button>
    `
})
export class AppComponent {
  title = 'GoodJob';
  user: User = {
    username: '',
    password: ''
  };
   clicked(event: any) {
     
     console.log(this.user)
     console.log(this.auth(this.user))
  }

  auth(user: User){
        var headers = new Headers()
        headers.append("Content-Type", 'application/json')

        var requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: "http://localhost:4000/api/users/authenticate",
            headers: headers,
            body: JSON.stringify({username: user.username, password: user.password})
        })
        console.log(requestoptions)
        return new Request(requestoptions)
  }
  
}