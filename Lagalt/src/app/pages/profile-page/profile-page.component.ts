import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { Routes, RouterModule, Router } from '@angular/router';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit{
  
  userName: String = "";

  constructor(private router: Router, private apiHandler:ApiHandlerService) { 
  }

  // Dummy Data:
  dummyName:String = "Mr Brass-Bilalsson (Billys)"
  dummyDescription:String = "I work in retail, I am 45 years old but my humor is that of a 15 year old. My motto: Laugh hard. Die Hard. Bruce Willys stars in Die Hard. I pretend am him. In life i am shining star... but on a bright day (sun in my eye). In gaming I play single player games cause they remind me that in real life I am single player. As project I look for frend i can play with. I dont have skills (sadge). Also I dislike spider because have claustrofobia. thx."
  projectModels:Project[] = []

  /**
   * ngOnInit()
   * On init we do a GET request using the apiHandler to set our project models with data from the Backend:
   */
  ngOnInit(): void {
    this.apiHandler.getProjects().subscribe(
      (projects: Project[]) => {
        this.projectModels = projects
      }

    )
  }

    /**
   * onRemoveEvent()
   * An event is passed up from a project item component and in the emitting of that event the corresponding project is passed.
   * Here we 1. Locally remove the project from our list of models and 2. We pass the changes via an API request. 
   */

    onRemoveEvent(project:Project){
      let index = this.projectModels.indexOf(project)
      this.projectModels.splice(index, 1)
      this.apiHandler.deleteProject(project)
    }

  /** 
   * onClickAddProject()
   * A button that maps the user the the form for creating a new project.
   */

  onClickAddProject() {
    this.router.navigate(['/add']);
  }

  /**
   * onSubmit()
   * When a user enters in the description the form is passed to this function, and here we can extract the text that was written in the textfield.
   * @param form, a NgForm that is passed in with data from the user.
   */

  public onSubmit(form: NgForm): void {
    this.dummyDescription = form.value.desc
  }
}
