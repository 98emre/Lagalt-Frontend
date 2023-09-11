import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectComment } from 'src/app/models/comment';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project-service.service';
import { UserService } from 'src/app/services/user-service.service';

import { Collaborator } from 'src/app/models/collaborator';
import { CollaboratorService } from 'src/app/services/collaborator-service.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent {

  project: Project | any = null;
  commentModels: ProjectComment[] = []
  projectOwner: User | any = null;
  collaboratorModels: Collaborator[] = []
  acceptedCollaboratorModels: Collaborator[] = []
  acceptedUserModels:User[] = []
  allUserModels:User[] = []
  user:User|any = null

  constructor(private userService:UserService, private projectService:ProjectService, private collaboratorService: CollaboratorService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const projectId = Number(params.get('id'));
      this.projectService.getProjectById(projectId).subscribe((project) => {
        this.project = project 

        console.log(JSON.stringify(project))
        this.userService.getUserById(project.userId).subscribe((projectOwner) => {
          this.projectOwner = projectOwner;
        })
      })

    });

    this.collaboratorService.getCollaborators().subscribe((collaborators) => {this.collaboratorModels = collaborators})
    this.userService.getAllUsers().subscribe((users) => {this.allUserModels = users})


    if(localStorage.getItem('user') != null)
      this.user = JSON.parse(localStorage.getItem('user')!)
  }

  ngDoCheck(){
    if(this.collaboratorModels.length > 0 && this.user != null && this.project != null){
      this.acceptedCollaboratorModels = this.collaboratorModels.filter((collaborator) => collaborator.status==="APPROVED")
      this.acceptedCollaboratorModels = this.acceptedCollaboratorModels.filter((acceptedCollaborator) => acceptedCollaborator.projectId == this.project.id)
    }

    this.acceptedUserModels = []
    if(this.acceptedCollaboratorModels.length > 0 && this.allUserModels.length > 0){
      for(let collaborator of this.acceptedCollaboratorModels){
        this.fillCollabList(collaborator.userId)
      }
    }
  }

  fillCollabList(collabId:number){
    // Check if the user has already been appended to the acceptedUserModels list:
    for(let user of this.acceptedUserModels){
      if(user.id == collabId){
        return
      }
    }
    
    // If not, attempt to find the current user and if they are therein, add them:
    for(let user of this.allUserModels){
      if(collabId == user.id){
        this.acceptedUserModels.push(user)
        break
      }
    }
  }
}
