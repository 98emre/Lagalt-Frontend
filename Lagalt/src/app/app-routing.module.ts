import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
//import {authGuard} from '.'

const routes: Routes = [ {
  path: 'profile',
  component: ProfilePageComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
