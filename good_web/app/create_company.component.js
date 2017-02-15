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
var CreateCompany = (function () {
    function CreateCompany(fb, goodJobService, router) {
        this.fb = fb;
        this.goodJobService = goodJobService;
        this.router = router;
        this.company = {
            name: "error",
            logo: "",
            bio: "",
            link_to_website: "",
            list_of_locations: [],
            hr_manager_ids: []
        };
        this.loginForm = this.fb.group({
            name: ["", forms_1.Validators.required],
            logo: ["", forms_1.Validators.required],
            bio: ["", forms_1.Validators.required],
            link_to_website: ["", forms_1.Validators.required],
            list_of_locations: ["", forms_1.Validators.required]
        });
    }
    CreateCompany.prototype.newUser = function (event) {
        this.company = { name: this.loginForm.value.name, logo: "link-to-picture", bio: this.loginForm.value.bio, list_of_locations: this.loginForm.value.list_of_locations, link_to_website: this.loginForm.value.link_to_website, hr_manager_ids: [] };
        var response = this.goodJobService.create_company(this.create(this.company, this.goodJobService.get_user().email));
        this.router.navigate(['/start']);
    };
    CreateCompany.prototype.create = function (company, email) {
        var comp = {
            "create": {
                "name": company.name,
                "logo": company.logo,
                "bio": company.bio,
                "link_to_website": company.link_to_website,
                "list_of_locations": company.list_of_locations,
                "email": email
            }
        };
        return comp;
    };
    CreateCompany = __decorate([
        core_1.Component({
            selector: 'create-company',
            template: "\n  <form [formGroup]=\"loginForm\" (ngSubmit)=\"newUser($event)\">\n    <input formControlName=\"name\" type=\"name\" placeholder=\"Your comapny name\">\n    <input formControlName=\"logo\" type=\"logo\" placeholder=\"Your company logo\">\n    <input formControlName=\"bio\" type=\"bio\" placeholder=\"Your company bio\">\n    <input formControlName=\"link_to_website\" type=\"link_to_website\" placeholder=\"Your link to your website\">\n    <input formControlName=\"list_of_locations\" type=\"list_of_locations\" placeholder=\"Your locations\">\n  <button type=\"submit\">create!</button>\n</form>\n<div>\n  <h4>{{user.name}} has been create!</h4>\n</div>\n  "
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, good_job_service_1.GoodJobService, router_1.Router])
    ], CreateCompany);
    return CreateCompany;
}());
exports.CreateCompany = CreateCompany;
//# sourceMappingURL=create_company.component.js.map