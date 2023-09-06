import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectComment } from 'src/app/models/comment';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment-service.service';
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
  user:User|any = null

  constructor(private projectService:ProjectService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const projectId = Number(params.get('id'));


      this.projectService.getProjectById(projectId).subscribe((project) => {
        this.project = project;
      })
    });
    this.user = JSON.parse(localStorage.getItem('user')!)
    console.log("test 33: " + this.user.id)
  }

}
