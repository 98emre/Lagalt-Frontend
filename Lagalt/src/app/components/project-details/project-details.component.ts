import { Component, Input } from '@angular/core';
import { Collaborator } from 'src/app/models/collaborator';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { CollaboratorService } from 'src/app/services/collaborator-service.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent {

  @Input() projectDetails: Project | any;
  @Input() projectOwner: User | any;
  @Input() collaboratorModels: Collaborator[] = [];
  @Input() collaboratorLength:number|any;

  user:User|any = null
  isCollaborator: boolean = false;
  isPending: boolean = false;

  constructor(private collaboratorService: CollaboratorService){}

  ngOnInit(){

    if(localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user')!) 
    }

  }

  ngOnChanges(){

    // checks if this project id and logged in user id is in the list
    const filterCollab = this.collaboratorModels.filter((collaborator) => collaborator.userId === this.user.id && collaborator.projectId === this.projectDetails.id && collaborator.status === "APPROVED")
    const filterPending = this.collaboratorModels.filter((collaborator) => collaborator.userId === this.user.id && collaborator.projectId === this.projectDetails.id && collaborator.status === "PENDING")

    if(filterCollab.length > 0){
      this.isCollaborator = true;
    }

    if(filterPending.length > 0){
      this.isPending = true;
    }

  }

  onCollabButton(){
    this.isPending = true;
    
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
