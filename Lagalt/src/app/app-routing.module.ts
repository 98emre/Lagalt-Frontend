import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [ 
  {
  path: 'profile',
  component: ProfilePageComponent,
  canActivate: [AuthGuard]
},
{
  path:'', 
  component: LandingPageComponent,
  pathMatch:"full"
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
