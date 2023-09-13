import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Collaborator } from 'src/app/models/collaborator';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { CollaboratorService } from 'src/app/services/collaborator-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-collaborator-item',
  templateUrl: './collaborator-item.component.html',
  styleUrls: ['./collaborator-item.component.scss']
})
export class CollaboratorItemComponent {
  @Input() projectModels:Project[]|any = null
  @Input() collaboratorModel:Collaborator|any = null
  @Output() triggerAPIRequest = new EventEmitter()
  project:Project|any = null
  username:String = ""
  users:User[] = []
  constructor(private collaboratorService:CollaboratorService, private userService:UserService){}


  /**
   * setUsername()
   * The method setUsername() is called to match the collaborator with a user to get their name.
   * Then, the name of said user is stored in this.username (and displayed via HTML).
   * @param collabId, The collaborator ID that we want to match with a user.
   */
  setUsername(collabId:number){
    for(let user of this.users){
      if (user.id == collabId){
        this.username = user.username
        break
      }
    }
  }

  /**
   * ngOnInit()
   * ngOnInit() will make an API request to get every user so we can use them later.
   */
  ngOnInit(){
    this.userService.getAllUsers().subscribe({
      next: (incomingUsers) => {this.users = incomingUsers}
    })
  }

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
      this.setUsername(this.collaboratorModel.userId);
      (JSON.parse(localStorage.getItem('user')!) as User).username
    }
  }

  /**
   * onAccept()
   * The onAccept() method is inwoked when the user clicks accept on a project.
   * A patch request is then made to the API.
   * Also a signal is emitted to the parent to make a new fetch of projects.
   */
  onAccept(){
    this.collaboratorModel.status = "APPROVED"
    this.collaboratorModel.approvalDate = new Date()
    this.collaboratorService.patchCollaborator(this.collaboratorModel)
    this.triggerAPIRequest.emit()
  }

  /**
   * onDecline()
   * If the event is triggered for when the user presses the decline button, then this method
   * is inwoked. This method in turn will inwoke the delete method from the collaborator
   * service to remove this specific instance of a collaborator.
   * Like with onAccept(), a signal is emitted to the parent to make a new fetch.
   */
  onDecline(){
    this.collaboratorModel.status = "DECLINED"
    this.collaboratorService.deleteCollaborator(this.collaboratorModel)
    this.triggerAPIRequest.emit()
  }
}
