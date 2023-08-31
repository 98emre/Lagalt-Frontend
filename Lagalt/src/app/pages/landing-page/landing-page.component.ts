import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
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
  selectedCategory: String = "none";
  allProjects: Project[] = [];
  
  constructor(private userService: UserService, private apiHandler:ApiHandlerService) {}

  ngOnInit(): void {

    if(this.userService.isAuthenticated()){
      let user = JSON.parse(localStorage.getItem("user")!)
      this.userName = user.username;
    }

    this.apiHandler.getProjects().subscribe(
      (projects: Project[]) => {
          this.projectModels = projects;
          this.allProjects = projects
      }
    )
  }

  isLoggedIn(){
    return this.userService.isAuthenticated()
  }

  onCategoryClicked(category: string){
    this.selectedCategory = category;
    this.projectModels = this.allProjects.filter(project => project.category === category);

  }

}
