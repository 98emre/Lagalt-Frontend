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

  // TODO: Currently, display the first project:
  project:Project = {id:1, category:"category", descriptions:"descriptions", gitlink:"gitlink", status:0, title:"title"}
  ngOnInit(): void {
  
  }
}
