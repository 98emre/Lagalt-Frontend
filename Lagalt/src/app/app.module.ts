import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    //Required to use forms features
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }