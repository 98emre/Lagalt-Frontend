import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-add-project-page',
  templateUrl: './add-project-page.component.html',
  styleUrls: ['./add-project-page.component.scss']
})
export class AddProjectPageComponent {
  constructor(apiHandler:ApiHandlerService){}

  // Dummy data:
  projectModels:Project[] = this.apiHandler.getProjects()

  /**
   * addProject()
   * A function that is triggered by listening to an event, takes in a project and adds it to the users' projects.
   * TODO: This is only done locally for now.
   * 
   * @param project 
   */

  addProject(project:Project){
    this.projectModels.push(project)
  }
  
}
