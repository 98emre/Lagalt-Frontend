import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { Routes, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss']
})
export class CustomFormComponent {
  constructor(private router: Router) { }

  @Output('pushProject') buttonPressed: EventEmitter<Project> = new EventEmitter(); 

  /**
   * onSubmit()
   * A form is inserted as an argument and relevant data is extracted to create a new project and push it up to the parent.
   * @param form, The form encapsulating all the relevant data.  
   */
  onSubmit(form: NgForm):void{
    let newTitle = form.value.title
    let newDescription = form.value.description
    let newCategory = form.value.category
    let project:Project = {id:1, name:newTitle, description:newDescription, owner:true, category:newCategory}
    this.pushToParent(project)
  }

  /**
   * pushToParent()
   * A helper function that onSubmit() uses to make it clear what happens: The new project is pushed up to the parent.
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
