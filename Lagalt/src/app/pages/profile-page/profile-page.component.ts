import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project-service.service';
import { UserService } from 'src/app/services/user-service.service';
import { Collaborator } from 'src/app/models/collaborator';
import { CollaboratorService } from 'src/app/services/collaborator-service.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit{

  constructor(private router: Router, private projectService:ProjectService, private userService: UserService, private collaboratorService:CollaboratorService) { 
}
  allProjects:Project[] = []
  projectModels:Project[] = []
  collaboratorModels:Collaborator[] = []
  collaboratorProjects:Project[] = []
  user:User|any = null;
  //hiddenMode: String = "";
  hiddenUser: boolean = false;
  

  /**
   * overlappingId()
   * A helper function to filter projects that the logged in user is a collaborator of.
   * @param project, The project to check if it is owned.
   * @returns True or False, depending on if the the collaborator IDs overlap.
   */
  overlappingId(project:Project){
    for(let collabId of this.user.collaboratorIds){
      if(project.collaboratorIds.includes(collabId)){
        return true
      }
    }
    return false
  }

  /**
   * ngOnInit()
   * On init we do a GET request using the apiHandler to set our project models with data from the Backend:
   * We also initialize a user from the localStorage. 
   */

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.userService.tokenRefresh()

    this.projectService.getProjects().subscribe(
      (projects: Project[]) => { 
        this.projectModels = projects.filter((element) => element.userId === this.user.id)
        this.collaboratorProjects = projects.filter((element) => this.overlappingId(element))
        
      }
    )

    this.collaboratorService.getCollaborators().subscribe(
      (collaborators:Collaborator[]) => { 
        this.collaboratorModels = collaborators.filter((collaborator) => collaborator.status == "PENDING") 
      }
    )

    if(this.user.profileVisibility == "PRIVATE"){
      this.hiddenUser = true;
    }
  }

  toggleUserVisibility(){
    let updatedSetting; 

    if(!this.hiddenUser){
      updatedSetting = "PRIVATE"
    }else{
      updatedSetting = "PUBLIC"
    }

    const updatedUser: Partial<User> = {
      profileVisibility: updatedSetting
    }
    
    this.userService.customUpdateUser(this.user.id, updatedUser).subscribe({
      next: (user) => {
        localStorage.setItem('user', JSON.stringify(user))
      }
    })

  }

  /** 
   * onClickAddProject()
   * A method that maps the event of clicking a button to a navigation to the add project page. 
   */

  onClickAddProject() {
    this.router.navigate(['/add']);
  }

  onClickMessagePage(){
    this.router.navigate(['/message-box'])
  }

  onClickAddMessage(){
    this.router.navigate(['/add-message'])
  }

}
