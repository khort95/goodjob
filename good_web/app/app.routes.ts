import { Routes, RouterModule }  from '@angular/router';
import { LoginPage } from './login.component';
import { MainPage } from './main-page.component';
import { CreateUser } from './create_user.component';
import { CreateCompany } from './create_company.component';
import { Temp } from './temp.component';
import { JobPanel } from './job_panel.component';

// Route config let's you map routes to components
const routes: Routes = [
  // map '/persons' to the people list component
  {
    path: 'start',
    component: LoginPage,
  },
    {
    path: 'create',
    component: CreateUser,
  },
  {
    path: 'company',
    component: CreateCompany
  },
  {
    path: 'app',
    component: MainPage
  },
  {
    path: 'temp',
    component: Temp
  },
  {
    path: 'app/job/:name/:company',
    component: JobPanel
  },
  // map '/' to '/persons' as our default route
  {
    path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  },
];

export const routing = RouterModule.forRoot(routes);
