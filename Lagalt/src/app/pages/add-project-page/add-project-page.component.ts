import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-add-project-page',
  templateUrl: './add-project-page.component.html',
  styleUrls: ['./add-project-page.component.scss']
})
export class AddProjectPageComponent {

  constructor(private router:Router, private apiHandler:ApiHandlerService){}


  /**
   * addProject()
   * A function that is triggered by listening to an event, takes in a project and adds it to the users' projects.
   * 
   * @param project 
   */

  addProject(project:Project){
    let dummyProject:Project = {id:2, title: "posted project", descriptions:"description posted", gitlink:"Yo link", category: "GAME", status:0, collaboratorIds:[], commentIds:[]}
    this.apiHandler.postProject(dummyProject)
    this.router.navigate(['/profile']);
  }
  
}
