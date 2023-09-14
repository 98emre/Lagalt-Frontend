import { Component, Input, } from '@angular/core';
import { Router } from '@angular/router';
import { Collaborator } from 'src/app/models/collaborator';
import { Project } from 'src/app/models/project';
import {User} from 'src/app/models/user'
import { CollaboratorService } from 'src/app/services/collaborator-service.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent{
  constructor(private router: Router, private collaboratorService:CollaboratorService) { }
  @Input() projectModel: Project | any;
  
  collaborator:boolean|any = null
  owner:boolean|any = null
  users:User[] = []

  collaborators:Collaborator[] = []

  /**
   * ngOnInit()
   * The ngOnInit() method is a bit complex. 
   * The reason for this is because a project have collaborators but we need to convert
   * every collaborator ID into a user object, to be able to compare our user ID to
   * the collaborators (made into users) of this project. 
   */
  ngOnInit(){
    this.collaboratorService.getCollaborators().subscribe({
      next:(incomingCollaborators) => {
        this.collaborators = incomingCollaborators
        if(localStorage.getItem('user') != null){
          let user:User = JSON.parse(localStorage.getItem('user')!) as User
          for(let collabIdProject of this.projectModel.collaboratorIds){
            for(let collaborator of this.collaborators){
              if(collaborator.id == collabIdProject && collaborator.userId == user.id){
                this.collaborator = true
              }
            }
          }
        }
      }
    })
  }

  ngOnChanges(){
    if(localStorage.getItem('user') != null){
      let user:User = JSON.parse(localStorage.getItem('user')!) as User
      if(this.projectModel.userId == user.id){
        this.owner = true;
        return
      }
    }
  }



  /**
   * onGotoClick()
   * This function is called on click and it navigates us to the current project:
   */
  onGotoClick(id:number){
    this.router.navigate(['/project', id]);
  }
}
