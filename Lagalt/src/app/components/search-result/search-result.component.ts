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

  /**
   * ngOnChanges()
   * As a child, this component takes in projectModels and userModels via the input.
   * To see that they are updated properly the ngOnChanges() method is then inwoked.
   * The Boolean flag is set to filter on users by default if it finds users.
   */
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
  /**
   * filterUserClick()
   * There are two buttons that filter on user and filter on projects.
   * Clicking one will disable the results of the other.
   * That is what filterUserClick() does, it disables the flag for projects
   * and enables the flag for users.
   */
  filterUserClick(){
    this.filterUser = true;
    this.filterProject = false;
  }

  /**
   * filterProjectClick()
   * This method does exactly the same but inversed.
   * It enables the project flag and disables the user flag.
   */
  filterProjectClick(){
    this.filterProject = true;
    this.filterUser = false;
  }

}
