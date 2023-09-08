import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { Routes, RouterModule, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project-service.service';
import { Collaborator } from 'src/app/models/collaborator';
import { CollaboratorService } from 'src/app/services/collaborator-service.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit{

  constructor(private router: Router, private projectService:ProjectService, private collaboratorService:CollaboratorService) { 
  }

  // Dummy Data:
  dummyName:String = "Mr Brass-Bilalsson (Billys)"
  dummyDescription:String = "I work in retail, I am 45 years old but my humor is that of a 15 year old. My motto: Laugh hard. Die Hard. Bruce Willys stars in Die Hard. I pretend am him. In life i am shining star... but on a bright day (sun in my eye). In gaming I play single player games cause they remind me that in real life I am single player. As project I look for frend i can play with. I dont have skills (sadge). Also I dislike spider because have claustrofobia. thx."
  projectModels:Project[] = []
  collaboratorModels:Collaborator[] = []

  user:User|any = null;

  /**
   * ngOnInit()
   * On init we do a GET request using the apiHandler to set our project models with data from the Backend:
   * We also initialize a user from the localStorage. 
   */
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);

    this.projectService.getProjects().subscribe(
      (projects: Project[]) => { this.projectModels = projects.filter((element) => element.userId === this.user.id) }
    )

    this.collaboratorService.getCollaborators().subscribe(
      (collaborators:Collaborator[]) => { this.collaboratorModels = collaborators }
    )
  }

  /** 
   * onClickAddProject()
   * A method that maps the event of clicking a button to a navigation to the add project page. 
   */

  onClickAddProject() {
    this.router.navigate(['/add']);
  }

}
