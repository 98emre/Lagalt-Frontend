import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  //public loginBtnClicked = false;
  userName: String = "";
  projectModels:Project[] = [];
  userModels: User[] = [];
  selectedCategory: String = "none";
  allProjects: Project[] = [];
  
  constructor(private userService: UserService, private projectService:ProjectService) {}

  ngOnInit(): void {

    if(this.userService.isAuthenticated()){
      let user = JSON.parse(localStorage.getItem("user")!)
      this.userName = user.username;
    }

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

  // Receives the search input from the child (search-form component)
  handleSearch(searchTerm: string) {
    console.log('Received search term:', searchTerm);
    this.userService.getUsersBySearch(searchTerm).subscribe(
      (users: User[]) => {
        console.log(users);

      }
    )
    ///this.userService.getUsersBySearch(searchTerm);
  }

  onCategoryClicked(category: string){
    this.selectedCategory = category;
    this.projectModels = this.allProjects.filter(project => project.category === category);

  }

}
