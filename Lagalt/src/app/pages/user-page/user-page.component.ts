import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

  user: User | null = null;
  projectModels: Project[] = []

  constructor(private userService: UserService, private projectService: ProjectService, private route: ActivatedRoute){}

  ngOnInit(){

    this.route.paramMap.subscribe((params: ParamMap) => {

      const userId = Number(params.get('id'));

      // get userdetails
      this.userService.getUserById(userId).subscribe((user) => {
        this.user = user;
      })

      // get projects
      this.projectService.getProjects().subscribe((projects) => {
        this.projectModels = projects.filter((element) => element.userId === userId)
      })

    });

  }

}
