import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

  user: User | null = null;

  constructor(private userService: UserService, private route: ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe((params: ParamMap) => {

      const userId = Number(params.get('id'));

      this.userService.getUserById(userId).subscribe((user) => {
        //this.user = user;
        console.log(user);
      })

    });

    //his.projectService.getProjectById

  }

}
