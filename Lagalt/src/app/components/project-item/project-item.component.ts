import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit{
  // Input: When the component is created a project model is passed:
  @Input() projectModel: Project | undefined;
  onwerStr:String = "Remove Project"
  ngOnInit(){
    ownerStr:String
  }
  onRemoveClick(){
    alert("onRemoveClick() was called in project-item.component")
  }
  onGotoClick(){
    alert("onGotoClick() was called in project-item.component")
  }
}
