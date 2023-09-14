import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss']
})
export class CustomFormComponent {
  constructor(private router: Router, private userService:UserService) { }

  @Output('pushProject') buttonPressed: EventEmitter<Project> = new EventEmitter(); 

  description: string = "";
  title: string = "";

  /**
   * onSubmit()
   * A form is inserted as an argument and relevant data is extracted to create a new project and push it up to the parent.
   * @param form, The form encapsulating all the relevant data.  
   */
  onSubmit(form: NgForm):void{
    let newTitle = form.value.title
    let newDescription = form.value.description
    let newCategory = form.value.category
    let newGit = form.value.git
    let project:Project = {id:1, title:newTitle, descriptions:newDescription, category:newCategory, gitlink: newGit, status:"NOT_STARTED", userId:0, commentIds:[], collaboratorIds:[]}
    this.pushToParent(project)
    this.userService.tokenRefresh()
  }

  /**
   * pushToParent()
   * A helper function that onSubmit() uses to make it clear what happens: The new project is pushed up to the parent.
   * The parent (Add Project Page) will then catch the signal and add the project to the API.
   * @param project 
   */
  pushToParent(project:Project){
    this.buttonPressed.emit(project)
  }

  /**
   * onGoBack()
   * A function that is triggered on a button click and navigates the user back to the profile page.
   */
  onGoBack(){
    this.router.navigate(['/profile']);
  }
}
