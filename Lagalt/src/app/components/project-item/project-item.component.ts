import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit{
  constructor(private router: Router) { }

  // Input, project model: When the component is created a project model is passed from its parent (which can be Landing Page, Profile Page, etc):
  @Input() projectModel: Project | any;

  // Input, role: On creation the parent passes a role down to project item, pertaining to if the user is the: Owner, collaborator, or has no relation to the project (Landing Page).
  @Input() role:String | any

  
  ngOnInit(){
  }

  /**
   * onGotoClick()
   * This function is called on click and it too emits a signal with the project to the parent (profile page), but for navigational purposes.
   */
  onGotoClick(id:number){
    this.router.navigate(['/project']);
  }
}
