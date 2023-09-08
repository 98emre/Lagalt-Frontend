import { Component, Input } from '@angular/core';
import { Collaborator } from 'src/app/models/collaborator';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-collaborator-item',
  templateUrl: './collaborator-item.component.html',
  styleUrls: ['./collaborator-item.component.scss']
})
export class CollaboratorItemComponent {
  @Input() projectModels:Project[]|any = null
  @Input() collaboratorModel:Collaborator|any = null
  project:Project|any = null
  
  getProject(){
    for(let project of this.projectModels){
      if(project.id == this.collaboratorModel.projectId){
        return project
      }
    }
  }

  ngDoCheck(){
    if(this.projectModels != null && this.collaboratorModel != null){
      console.log("yo")
      this.project = this.getProject()
    }
  }
}
