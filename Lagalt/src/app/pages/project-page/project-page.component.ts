import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent {
  constructor(private apiHandler:ApiHandlerService){}

  // TODO: Currently, display the dummy project:
  project:Project = {id:1, category:"dummy project", descriptions:"dummy project", gitlink:"dummy project", status:0, title:"dummy project", commentIds:[], collaboratorIds:[]}
  ngOnInit(): void {
  
  }
}
