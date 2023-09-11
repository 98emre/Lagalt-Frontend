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

  /**
   * hasProject()
   * hasProject() is a filter method that filters projects based on ID.
   * An ID (pertaining to a collaborator) comes in.
   * If a project were to have a userID matching with that collaborator ID,
   * that collaborator can be said to have atleast one match and should remain.
   * 
   * @param projectId, The ID corresponding to a collaborator. 
   * @returns true or false, depending on if the collaborator has a project or not.
   */
  hasProject(projectId:number){
    for(let project of this.projectModels!){
      if(project.id === projectId){
        return true
      }
    }
    return false
  }

  /**
   * ngDoCheck()
   * When the input values come in from the input, this method is inwoked.
   * A filter is applied to extract only collaborators that have atleast one project.
   */
  ngDoCheck(){
    this.readFromAPI()
  }

  /**
   * readFromAPI()
   * This method reads collaborator data from the API
   */
  readFromAPI(){
    if(this.collaboratorModels != null && this.projectModels != null){
      this.filteredModels = this.collaboratorModels.filter((collaboratorModel) => this.hasProject(collaboratorModel.projectId) && collaboratorModel.status == "PENDING")
    }
  }
}
