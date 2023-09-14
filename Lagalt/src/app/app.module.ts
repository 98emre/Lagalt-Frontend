import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { AddProjectPageComponent } from './pages/add-project-page/add-project-page.component';
import { CustomFormComponent } from './components/custom-form/custom-form.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';
import { SearchFormComponent } from './components/search-form/search-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    LandingPageComponent,
    ProjectItemComponent,
    ProjectListComponent,
    DropDownComponent,
    AddProjectPageComponent,
    CustomFormComponent,
    ProjectPageComponent,
    CommentSectionComponent,
    SearchFormComponent,
    CommentItemComponent,
    UserItemComponent,
    UserPageComponent,
    UserDetailsComponent,
    CollaboratorListComponent,
    CollaboratorItemComponent,
    SearchResultComponent,
    ProjectDetailsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    //Required to use forms features
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { CollaboratorListComponent } from './components/collaborator-list/collaborator-list.component';
import { CollaboratorItemComponent } from './components/collaborator-item/collaborator-item.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

