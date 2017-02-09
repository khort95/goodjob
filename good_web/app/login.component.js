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
var forms_1 = require('@angular/forms');
var good_job_service_1 = require('./good-job.service');
var router_1 = require('@angular/router');
var LoginPage = (function () {
    function LoginPage(fb, goodJobService, router) {
        this.fb = fb;
        this.goodJobService = goodJobService;
        this.router = router;
        this.user = { email: "", picture: "", bio: "", permissions: [], role: "", name: " error", company: "" };
        this.loginForm = this.fb.group({
            email: ["", forms_1.Validators.required],
            password: ["", forms_1.Validators.required]
        });
    }
    LoginPage.prototype.doLogin = function (event) {
        this.goodJobService.login(this.loginForm.value.password, this.loginForm.value.email);
        this.user = this.goodJobService.get_user();
        console.log(this.user);
        if (this.user.name !== "error!") {
            this.router.navigate(['/app']);
        }
    };
    LoginPage = __decorate([
        core_1.Component({
            selector: 'login-page',
            template: "\n  <form [formGroup]=\"loginForm\" (ngSubmit)=\"doLogin($event)\">\n    <input formControlName=\"email\" type=\"email\" placeholder=\"Your email\">\n    <input formControlName=\"password\" type=\"password\" placeholder=\"Your password\">\n  <button type=\"submit\">Log in</button>\n</form>\n\n<a href=\"create user\" [routerLink]=\"['/create']\">create user</a>\n  "
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, good_job_service_1.GoodJobService, router_1.Router])
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
//# sourceMappingURL=login.component.js.map