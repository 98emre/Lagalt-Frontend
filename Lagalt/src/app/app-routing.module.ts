import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import { AddProjectPageComponent } from './pages/add-project-page/add-project-page.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { AuthGuard } from './guards/auth.guard';
import { UserPageComponent } from './pages/user-page/user-page.component';

const routes: Routes = [ 
  {
  path: 'profile',
  component: ProfilePageComponent,
  canActivate: [AuthGuard]
},
{
  path: 'add',
  component: AddProjectPageComponent,
  canActivate: [AuthGuard]
},
{
  path: 'project/:id',
  component: ProjectPageComponent,
},
{
  path: 'user/:id',
  component: UserPageComponent,
},
{
  path:'', 
  component: LandingPageComponent,
  pathMatch:"full"
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
