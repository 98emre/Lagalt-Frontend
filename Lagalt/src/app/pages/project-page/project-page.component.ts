import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';
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
  acceptedUserModels:any[] = []
  allUserModels:User[] = []
  user:User|any = null

  constructor(private userService:UserService, 
    private projectService:ProjectService, 
    private collaboratorService: CollaboratorService, 
    private route: ActivatedRoute,
    private router:Router){}

  /**
 * ngOnInit()
 * The ngOnInit() method in the project page will extract an ID from the URL and use that as 
 * an index to acquire a project page from the database. Global constants such as the owner
 * of the project is set here. 
 */
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const projectId = Number(params.get('id'));
      this.projectService.getProjectById(projectId).subscribe(
        (project) => {
          this.project = project;
      
          this.userService.getUserById(project.userId).subscribe(
            (projectOwner) => {
              this.projectOwner = projectOwner;
            }
          );
        },
        (error) => {
          // Navigate to not found page if project id not found 
          this.router.navigate(['/not-found']);
        }
      );
    });

    this.getCollaborators()
    this.userService.getAllUsers().subscribe((users) => {this.allUserModels = users})


    if(localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user')!)
      this.userService.tokenRefresh()
    }
  }

  /**
   * ngDoCheck()
   * If there are collaborators and the project is not null, then acceptedCollaboratorModels will be set as the models were the id for that collaborator matches with
   * the project AND where the status is set to be APPROVED. The fillCollabList() is a help function that fills a list of users corresponding to those who are 
   * collaborators on this project (So that their names etc can be displayed).
   */
  ngDoCheck(){
    if(this.collaboratorModels.length > 0 && this.project != null){
      this.acceptedCollaboratorModels = this.collaboratorModels.filter((collaborator) => collaborator.status==="APPROVED" && collaborator.projectId == this.project.id)
    }

    this.acceptedUserModels = []
    if(this.acceptedCollaboratorModels.length > 0 && this.allUserModels.length > 0){
      for(let collaborator of this.acceptedCollaboratorModels){
        this.fillCollabList(collaborator.userId, collaborator.id)
      }
    }
  }

  /**
   * fillCollabList()
   * fillCollabList() is a helper method that basically reads in users from the allUserModels and for each user therein, 
   * it adds an augmented user to the array acceptedUserModels if they are not already in the list.
   * An augmentedUser is a "superclass" of a user. It holds everything that a user would hold
   * but it also holds a collaboratorId, corresponding to the SPECIFIC collaborator instance,
   * this is so that we know which collaborator object to remove. 
   * 
   * @param collabId, The ID of the collaborator that we are looking to add.
   */
  fillCollabList(collabUserId:number, collabId:number){
    // 1. Check if the user has already been appended to the acceptedUserModels list:
    for(let user of this.acceptedUserModels){
      if(user.id == collabUserId){
        return
      }
    }
    
    // 2. If not, attempt to find the current user and if they are therein, add them:
    for(let user of this.allUserModels){
      if(collabUserId == user.id){
        let augmentedUser:any = {...user, collaboratorId:collabId}
        this.acceptedUserModels.push(augmentedUser)
        break
      }
    }
  }

  /**
   * removeCollaborator()
   * removeCollaborator() is a method that makes a HTTP DELETE request to collaborator service.
   * Also, the method will make sure to update the current collaborators after that request is
   * made. P.S: Only the project owner or the collaborator can remove the collaborator.
   *
   * @param collaboratorId, The id of the collaborator to remove.
   */
  removeCollaborator(collaboratorId:number){
    this.collaboratorService.customDeleteCollaboratorOnId(collaboratorId).subscribe({
      complete: () =>{this.getCollaborators()}
    })
  }

  /**
   * removeProject()
   * Makes a DELETE HTTP request and then navigates back to the profile of the user who comissioned the DELETE.
   */
  removeProject(){
    this.projectService.deleteProject(this.project.id);
    this.userService.tokenRefresh()
    window.location.href="/profile";
  }

  /**
   * getCollaborators()
   * A method that makes a HTTP request to the collaborators and re-renders them.
   * To have this functionality encapsulated into a method is useful because we
   * want to remove collaborators sometimes and after that removal is done we want
   * the list of collaborators to be updated. We can do this by invoking this method
   * after a removal. 
   */
  getCollaborators(){
    this.collaboratorService.getCollaborators().subscribe((collaborators) => {
      this.collaboratorModels = collaborators
    })
  }
}
