import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  projectModels:Project[] = [];
  userModels: User[] = [];
  allProjects: Project[] = [];


  selectedCategory: String = "none";
  searchBtnClicked: boolean = false;
  searchTerm: string = "";
  
  constructor(private userService: UserService, private projectService:ProjectService) {}

  /**
   * ngOnInit()
   * The ngOnInit lifecycle hook makes a subscription to set the projectModels, which contain
   * fields for everything that we might need for a project (id, title etc).
   */

  ngOnInit(): void {

    this.projectService.getProjects().subscribe(
      (projects: Project[]) => {
          this.projectModels = projects;
          this.allProjects = projects
      }
    )
  }

  isLoggedIn(){
    return this.userService.isAuthenticated()
  }

  /**
   * handleSearch()
   * handleSearch() is a method that receives the search input from its child (search-form component).
   * handleSearch() then conducts a getProjectsBySearch() / getUsersBySearch().
   * These two methods make API requests based on a LIKE query on the backend side. 
   */
  
  handleSearch(searchTerm: string) {
    this.searchBtnClicked = true;
    this.searchTerm = searchTerm;

    this.userService.getUserBySearch(this.searchTerm).subscribe(
      (users: User[]) => {
        this.userModels = users;
      }
    )

    this.projectService.getProjectsBySearch(this.searchTerm).subscribe(
      (projects: Project[]) => {
        this.projectModels = projects;
      }
    )

  }

  /**
   * onCategoryClicked()
   * This method takes in a category, based on a button click, and then conducts a filter
   * on a list of every project, where the category would be the predicate for that filter. 
   * @param category, The category that is inputted and used in the filter.
   */

  onCategoryClicked(category: string){
    this.selectedCategory = category;
    this.projectModels = this.allProjects.filter(project => project.category === category);

  }

}
