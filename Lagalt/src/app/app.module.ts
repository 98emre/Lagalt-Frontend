import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { ProjectListComponent } from './components/project-list/project-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    LandingPageComponent,
    LoginFormComponent,
    ProjectItemComponent,
    ProjectListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
     //Required to use forms features
    FormsModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }