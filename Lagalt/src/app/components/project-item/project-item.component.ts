import { Component, Input, } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import {User} from 'src/app/models/user'

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent{
  constructor(private router: Router) { }
  @Input() projectModel: Project | any;
  
  collaborator:boolean|any = null
  owner:boolean|any = null

  /**
   * ngOnInit()
   * On init this project-item component will attempt to get the logged in user and establish relations regarding ownership of the project, encapsulated in project model:
   */
  ngDoCheck(){
    if(localStorage.getItem('user') != null){
      let user:User = JSON.parse(localStorage.getItem('user')!) as User
      if(this.projectModel.userId == user.id){
        this.owner = true;
        return
      }

      for(let collabID of this.projectModel.collaboratorIds){
        if(collabID == user.id){
          this.collaborator = true
          break
        }
      }
    }
  }



  /**
   * onGotoClick()
   * This function is called on click and it navigates us to the current project:
   */
  onGotoClick(id:number){
    this.router.navigate(['/project', id]);
  }
}
