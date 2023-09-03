import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectComment } from 'src/app/models/comment';
import { Project } from 'src/app/models/project';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent {

  project: Project | null = null;
  commentModels: ProjectComment[] = []

  constructor(private apiHandler:ApiHandlerService, private route: ActivatedRoute){}

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      const projectId = Number(params.get('id'));


      this.apiHandler.getProjectById(projectId).subscribe((project) => {
        console.log(project);
        this.project = project;
      })

    });
  }

}
