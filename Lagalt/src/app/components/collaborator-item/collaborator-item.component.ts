import { Component, Input } from '@angular/core';
import { Collaborator } from 'src/app/models/collaborator';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { CollaboratorService } from 'src/app/services/collaborator-service.service';

@Component({
  selector: 'app-collaborator-item',
  templateUrl: './collaborator-item.component.html',
  styleUrls: ['./collaborator-item.component.scss']
})
export class CollaboratorItemComponent {
  @Input() projectModels:Project[]|any = null
  @Input() collaboratorModel:Collaborator|any = null
  project:Project|any = null
  username:String = ""

  constructor(private collaboratorService:CollaboratorService){}

  /**
   * getProject()
   * getProject() is a method that iterates over every project model that we currently have
   * and returns the matching one from our collaborator model. 
   * @returns project, The project model that matches the id found in collaboratorModel.
   */
  getProject(){
    for(let project of this.projectModels){
      if(project.id == this.collaboratorModel.projectId){
        return project
      }
    }
  }
  /**
   * ngDoCheck()
   * When a change is done to projectModels AND to collaboratorModel (i.e the input comes in)
   * then this function is called. The user is extracted from the local storage and the
   * helper function getProject() is called to find the project from the ID.
   * After this, the two are re-rendered onto the HTML canvas.
   */
  ngDoCheck(){
    if(this.projectModels != null && this.collaboratorModel != null){
      this.project = this.getProject()
      this.username = (JSON.parse(localStorage.getItem('user')!) as User).username
    }
  }

  onAccept(){
    this.collaboratorModel.status = "APPROVED"
    this.collaboratorModel.approvalDate = new Date()
    this.collaboratorService.patchCollaborator(this.collaboratorModel)
  }

  /**
   * onDecline()
   * If the event is triggered for when the user presses the decline button, then this method
   * is inwoked. This method in turn will inwoke the delete method from the collaborator
   * service to remove this specific instance of a collaborator. 
   */
  onDecline(){
    this.collaboratorModel.status = "DECLINED"
    this.collaboratorService.deleteCollaborator(this.collaboratorModel)
  }
}
