import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit{
  // Input: When the component is created a project model is passed from its parent:
  @Input() projectModel: Project | undefined;

  // Output: This component (project item) can pass up a remove request:
  @Output('buttonPressed') buttonPressed: EventEmitter<Project> = new EventEmitter(); 
  
  ngOnInit(){
  }

  /**
   * onRemoveClick()
   * This function is called on click and it emits a signal with the project up to the parent (profile page), so profile page can remove it.
   */
  onRemoveClick(){ 
    this.buttonPressed.emit(this.projectModel)
  }

  /**
   * onGotoClick()
   * This function is called on click and it too emits a signal with the project to the parent (profile page), but for navigational purposes.
   */
  onGotoClick(){
    alert("onGotoClick() was called in project-item.component")
  }
}
