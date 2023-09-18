import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import { AddProjectPageComponent } from './pages/add-project-page/add-project-page.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { AuthGuard } from './guards/auth.guard';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MessagePageComponent } from './pages/message-page/message-page.component';
import { AddMessagePageComponent } from './pages/add-message-page/add-message-page.component';

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
  path:"add-message",
  component:AddMessagePageComponent
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
  path: 'message/:id',
  component: MessagePageComponent,
},
{
  path:'', 
  component: LandingPageComponent,
  pathMatch:"full"
},
{
  path:'not-found',
  component: NotFoundComponent
},
{
  path: '**',
  redirectTo: 'not-found', 
  pathMatch: 'full'
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
