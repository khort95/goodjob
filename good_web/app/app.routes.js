"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./login.component');
var main_page_component_1 = require('./main-page.component');
// Route config let's you map routes to components
var routes = [
    // map '/persons' to the people list component
    {
        path: 'start',
        component: login_component_1.LoginPage,
    },
    {
        path: 'app',
        component: main_page_component_1.MainPage
    },
    // map '/' to '/persons' as our default route
    {
        path: '',
        redirectTo: '/start',
        pathMatch: 'full'
    },
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map