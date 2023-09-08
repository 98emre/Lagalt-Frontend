import { Component, Input } from '@angular/core';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {

  @Input() userModels:User[]|null = null
  @Input() projectModels:Project[]|null = null
  @Input() searchTerm: string = "";

  filterUser: boolean = false;
  filterProject: boolean = false;
  usersFound: boolean = false;
  projectsFound: boolean = false;

  ngOnChanges(){
    if (this.userModels != null && this.userModels.length > 0) {
      this.usersFound = true;
      this.filterUser = true;
    } else {
      this.usersFound = false;
    }


    if (this.projectModels != null && this.projectModels.length > 0) {
      this.projectsFound = true;
    } else {
      this.projectsFound = false;
    }

  }

  filterUserClick(){
    this.filterUser = true;
    this.filterProject = false;
  }

  filterProjectClick(){
    this.filterProject = true;
    this.filterUser = false;
  }

}
