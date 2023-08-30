import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit{
  // Input: When the component is created a project model is passed:
  @Input() projectModel: Project | undefined;
  @Output('buttonPressed') buttonPressed: EventEmitter<Project> = new EventEmitter(); 
  
  ngOnInit(){
    ownerStr:String
  }
  onRemoveClick(){ 
    this.buttonPressed.emit(this.projectModel)
  }
  onGotoClick(){
    alert("onGotoClick() was called in project-item.component")
  }
}
