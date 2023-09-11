import { Component, Input } from '@angular/core';
import { Collaborator } from 'src/app/models/collaborator';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { CollaboratorService } from 'src/app/services/collaborator-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent {

  @Input() projectDetails: Project | any;
  @Input() projectOwner: User | any;

  user:User|any = null
  collaboratorModels: Collaborator[] = []

  constructor(private collaboratorService: CollaboratorService, private userService: UserService){}

  ngOnInit(){
    this.collaboratorService.getCollaborators().subscribe((collaborators) => {this.collaboratorModels = collaborators}) 

    if(localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user')!) 
    }

  }

  onCollabButton(){
    let newCollaborator:Collaborator = 
    {
      id: 1,
      userId: this.user.id,
      status: "PENDING", 
      requestDate: new Date(),
      approvalDate: null,
      projectId: this.projectDetails.id
    }
    this.collaboratorService.postCollaborator(newCollaborator)
  }

}
