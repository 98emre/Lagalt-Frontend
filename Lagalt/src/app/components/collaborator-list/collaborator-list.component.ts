import { Component, Input } from '@angular/core';
import { Collaborator } from 'src/app/models/collaborator';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.scss']
})
export class CollaboratorListComponent {
  @Input() collaboratorModels:Collaborator[]|null = null
  @Input() projectModels:Project[]|null = null

  filteredModels:Collaborator[] = []
  hasProject(projectId:number){
    for(let project of this.projectModels!){
      if(project.id === projectId){
        return true
      }
    }
    return false
  }
  ngOnChanges(){
    if(this.collaboratorModels != null && this.projectModels != null){
    }
  }

  ngDoCheck(){
    if(this.collaboratorModels != null && this.projectModels != null){
      this.filteredModels = this.collaboratorModels.filter((collaboratorModel) => this.hasProject(collaboratorModel.projectId))
    }
  }
}
