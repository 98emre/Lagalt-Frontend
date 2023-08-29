import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectItemComponent } from 'src/app/components/project-item/project-item.component';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit{
  constructor() { }
  ngOnInit(): void {}

  dummyName:String = "Mr Brass-Bilalsson"
  dummyDescription:String = "I work in retail, I am 45 years old but my humor is that of a 15 year old. My motto: Laugh hard. Die Hard. Bruce Willys stars in Die Hard. I am him. I am a shining star. On a bright day."
  projectList:ProjectItemComponent[] = [ProjectItemComponent, ProjectItemComponent, ProjectItemComponent]

  /** 
   * TODO: Currently this function only registers a button press. It should perhaps navigate the user to the add project component?
   * 
   * onClickAddProject()
   * A button that should map the user the the form for creating a new project.
   */

  onClickAddProject() {
    alert("profile-page.onClick() was called");
  }

  /**
   * TODO: Currently this function is mapped to a dummy variable but the text can (and should) refer to the logged in user later on.
   * 
   * onSubmit()
   * When a user enters in the description the form is passed to this function, and here we can extract the text that was written in the textfield.
   * @param form, a NgForm that is passed in with data from the user.
   */

  public onSubmit(form: NgForm): void {
    this.dummyDescription = form.value.desc
  }
}
