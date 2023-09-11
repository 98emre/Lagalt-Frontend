import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectComment } from 'src/app/models/comment';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project-service.service';
import { UserService } from 'src/app/services/user-service.service';
import { Collaborator } from 'src/app/models/collaborator';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent {

  project: Project | any = null;
  commentModels: ProjectComment[] = []
  projectOwner: User | any = null;
  collaboratorModels: Collaborator[] = []
  acceptedCollaboratorModels: Collaborator[] = []

  constructor(private projectService:ProjectService, private route: ActivatedRoute, private userService: UserService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const projectId = Number(params.get('id'));
      this.projectService.getProjectById(projectId).subscribe((project) => {
        this.project = project 

        this.userService.getUserById(project.userId).subscribe((projectOwner) => {
          this.projectOwner = projectOwner;
        })
      })

    });

  }
}
