import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-add-project-page',
  templateUrl: './add-project-page.component.html',
  styleUrls: ['./add-project-page.component.scss']
})
export class AddProjectPageComponent implements OnInit {

  projectModels:Project[] = []
  constructor(private router:Router, private projectService:ProjectService, private userService:UserService){}
  
  /** 
  * ngOnInit()
  * Reads in the projects from the API to be stored locally.   
  */
  ngOnInit(): void {
    this.projectService.getProjects().subscribe(
      (projects: Project[]) => {
        this.projectModels = projects
      }

    )
  }

  /**
   * addProject()
   * A function that is triggered by listening to an event, takes in a project and adds it to the users' projects.
   * @param project 
   */

  addProject(project:Project){
    let user = JSON.parse(localStorage.getItem('user')!) as User
    let insertProject:Project = {id: 1, title: project.title, descriptions:project.descriptions, gitlink:project.gitlink, category: project.category, status:0, userId:user.id, collaboratorIds:[], commentIds:[]}
    this.projectService.postProject(insertProject)
    this.projectModels.push(insertProject)
    this.router.navigate(['/profile']);
  }
  
}
