import { Component, Input, OnInit } from '@angular/core';
import { ProjectComment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent {
  // Input: Reads in the data content of a project (a model):
  @Input() commentModel: ProjectComment | any;
  author:User|any = null
  constructor(private userService:UserService){}
  ngOnChanges(): void {
    console.log(JSON.stringify(this.commentModel))
    this.userService.getUserById(this.commentModel.userId).subscribe({
      next:((response) => {this.author = response.username}),
      error:((error) => console.error(error))
    }
    )
  }
}
