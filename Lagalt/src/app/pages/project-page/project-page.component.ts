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
  acceptedUserModels:User[] = []
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

    this.collaboratorService.getCollaborators().subscribe((collaborators) => {
      this.collaboratorModels = collaborators
    })
    this.userService.getAllUsers().subscribe((users) => {this.allUserModels = users})


    if(localStorage.getItem('user') != null)
      this.user = JSON.parse(localStorage.getItem('user')!)
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
        this.fillCollabList(collaborator.userId)
      }
    }
  }

  /**
   * fillCollabList()
   * fillCollabList() is a helper method that basically reads in users from the allUserModels and for each user therein, it adds a user to the array acceptedUserModels
   * if they are not already in the list.
   * @param collabId, The ID of the collaborator that we are looking to add.
   */
  fillCollabList(collabId:number){
    // 1. Check if the user has already been appended to the acceptedUserModels list:
    for(let user of this.acceptedUserModels){
      if(user.id == collabId){
        return
      }
    }
    
    // 2. If not, attempt to find the current user and if they are therein, add them:
    for(let user of this.allUserModels){
      if(collabId == user.id){
        this.acceptedUserModels.push(user)
        break
      }
    }
  }

  removeProject(){
    this.projectService.deleteProject(this.project.id);
    window.location.href="/profile";
  }
}
