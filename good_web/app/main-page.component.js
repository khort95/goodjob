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
var good_job_service_1 = require('./good-job.service');
var MainPage = (function () {
    function MainPage(goodJobService) {
        this.goodJobService = goodJobService;
        this.user = null;
        this.company = null;
        this.user = goodJobService.get_user();
        goodJobService.fetch_company(this.user.company);
        this.company = goodJobService.get_company();
    }
    MainPage = __decorate([
        core_1.Component({
            selector: 'main-page',
            template: "\n\n<div>\n  <h4>hello {{user.name}}</h4>\n  <h4>hello {{company.name}}</h4>\n  <h4>hello {{company.bio}}</h4>\n\n</div>\n  "
        }), 
        __metadata('design:paramtypes', [good_job_service_1.GoodJobService])
    ], MainPage);
    return MainPage;
}());
exports.MainPage = MainPage;
//# sourceMappingURL=main-page.component.js.map