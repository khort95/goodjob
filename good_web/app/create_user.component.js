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
var CreateUser = (function () {
    function CreateUser(fb, goodJobService) {
        this.fb = fb;
        this.goodJobService = goodJobService;
        this.user = {
            email: "",
            picture: "",
            bio: "",
            permissions: [],
            role: "",
            api_token: "temp",
            name: " error"
        };
        this.loginForm = this.fb.group({
            email: ["", forms_1.Validators.required],
            password: ["", forms_1.Validators.required],
            name: ["", forms_1.Validators.required],
            company: ["", forms_1.Validators.required],
            bio: ["", forms_1.Validators.required],
            role: ["", forms_1.Validators.required]
        });
    }
    CreateUser.prototype.newUser = function (event) {
        this.user = { email: this.loginForm.value.email, picture: "link-to-picture", bio: this.loginForm.value.bio, permissions: [], role: this.loginForm.value.role, api_token: "", name: this.loginForm.value.name };
        var response = this.goodJobService.create_user(this.create(this.user, this.loginForm.value.password));
        console.log(this.user);
    };
    CreateUser.prototype.create = function (user, password) {
        var hr = {
            "hr_person": {
                "email": user.email,
                "name": user.name,
                "password": password,
                "bio": user.bio,
                "picture": user.picture,
                "role": user.role,
                "is_head_hr_manager": "false",
                "permissions": user.permissions,
                "api_token": "temp"
            }
        };
        return hr;
    };
    CreateUser = __decorate([
        core_1.Component({
            selector: 'create-user',
            template: "\n  <form [formGroup]=\"loginForm\" (ngSubmit)=\"newUser($event)\">\n    <input formControlName=\"email\" type=\"email\" placeholder=\"Your email\">\n    <input formControlName=\"password\" type=\"password\" placeholder=\"Your password\">\n    <input formControlName=\"name\" type=\"name\" placeholder=\"Your name\">\n    <input formControlName=\"company\" type=\"company\" placeholder=\"Your company\">\n    <input formControlName=\"bio\" type=\"bio\" placeholder=\"A shot desciprtion of yourself\">\n    <input formControlName=\"role\" type=\"role\" placeholder=\"Your role at your company\">\n  <button type=\"submit\">create!</button>\n</form>\n<div>\n  <h4>{{user.name}} has been create!</h4>\n</div>\n  "
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, good_job_service_1.GoodJobService])
    ], CreateUser);
    return CreateUser;
}());
exports.CreateUser = CreateUser;
//# sourceMappingURL=create_user.component.js.map