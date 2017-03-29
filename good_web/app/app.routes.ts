import { Routes, RouterModule }  from '@angular/router';
import { LoginPage } from './login.component';
import { MainPage } from './main-page.component';
import { CreateUser } from './create_user.component';
import { CreateCompany } from './create_company.component';
import { ChatWindow } from './chat.component';
import { JobSeekerPanel } from './job_seeker.component';
import { JobPanel } from './job_panel.component';
import { Settings } from './settings.component';
import { UploadResume } from './upload-resume.component';
import { ViewResume } from './view-resume.component';

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
    path: 'app/settings',
    component: Settings
  },
  {
    path: 'app/job_seeker/:email',
    component: UploadResume
  },
  {
    path: 'app/job_seeker/resume/:email',
    component: ViewResume
  },
  // map '/' to '/persons' as our default route
  {
    path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  },
];

export const routing = RouterModule.forRoot(routes);
