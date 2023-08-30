import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-add-project-page',
  templateUrl: './add-project-page.component.html',
  styleUrls: ['./add-project-page.component.scss']
})
export class AddProjectPageComponent {
  // Dummy data:
  projectModels:Project[] = [{id:1, name: "yo yo yo project", owner: true, description: "yo", category:"yo"}]

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
