import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-add-project-page',
  templateUrl: './add-project-page.component.html',
  styleUrls: ['./add-project-page.component.scss']
})
export class AddProjectPageComponent {
  projectModels:Project[] = [{id:1, name: "yo yo yo project", owner: true, description: "yo", category:"yo"}]

  test(project:Project){
    this.projectModels.push(project)
  }
  
}
