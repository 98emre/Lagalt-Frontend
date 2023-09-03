import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectComment } from 'src/app/models/comment';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent {

  project: Project | null = null;
  commentModels: ProjectComment[] = []

  constructor(private projectService:ProjectService, private route: ActivatedRoute){}

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      const projectId = Number(params.get('id'));


      this.projectService.getProjectById(projectId).subscribe((project) => {
        console.log(project);
        this.project = project;
      })

    });
  }

}
