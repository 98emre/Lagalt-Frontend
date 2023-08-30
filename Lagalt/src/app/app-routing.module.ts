import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import { AddProjectPageComponent } from './pages/add-project-page/add-project-page.component';
//import {authGuard} from '.'

const routes: Routes = [ 
  {
  path: 'profile',
  component: ProfilePageComponent,
},
{
  path: 'add',
  component: AddProjectPageComponent
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
