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
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
// Import RxJs required methods
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var GoodJobService = (function () {
    function GoodJobService(http) {
        this.http = http;
    }
    GoodJobService.prototype.login = function (password, email) {
        var _this = this;
        var creds = JSON.stringify({ email: email, password: password });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post('http://localhost:4000/api/hr_person/authenticate', creds, {
            headers: headers
        }).map(function (data) { return data.json(); }).subscribe(function (data) {
            return _this.hr_person = {
                email: data.email,
                name: data.name,
                picture: data.picture,
                bio: data.bio,
                permissions: data.permissions,
                role: data.role,
                api_token: data.api_token
            };
        });
        if (this.hr_person == null) {
            return { email: "", picture: "", bio: "", permissions: [], role: "", api_token: "", name: " error" };
        }
        return this.hr_person;
    };
    GoodJobService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GoodJobService);
    return GoodJobService;
}());
exports.GoodJobService = GoodJobService;
//# sourceMappingURL=good-job.service.js.map