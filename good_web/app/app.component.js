"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var User = (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'GoodJob';
        this.user = {
            username: '',
            password: ''
        };
    }
    AppComponent.prototype.clicked = function (event) {
        console.log(this.user);
        console.log(this.auth(this.user));
    };
    AppComponent.prototype.auth = function (user) {
        var headers = new http_1.Headers();
        headers.append("Content-Type", 'application/json');
        var requestoptions = new http_1.RequestOptions({
            method: http_1.RequestMethod.Post,
            url: "http://localhost:4000/api/users/authenticate",
            headers: headers,
            body: JSON.stringify({ username: user.username, password: user.password })
        });
        console.log(requestoptions);
        return new http_1.Request(requestoptions);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <h1>{{title}}</h1>\n    <h2>Hello {{user.username}}</h2>\n    <div>\n      <label>username </label>\n      <input [(ngModel)]=\"user.username\" placeholder=\"name\">\n    </div>\n      <div>\n      <label>password </label>\n      <input [(ngModel)]=\"user.password\" placeholder=\"name\">\n    </div>\n\n    <button (click)=\"clicked($event)\">Submit</button>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map