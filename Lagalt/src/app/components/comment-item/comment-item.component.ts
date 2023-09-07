import { Component, Input, OnInit } from '@angular/core';
import { ProjectComment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent {
  // Input: Reads in the data content of a project (a model):
  @Input() commentModel: ProjectComment | any;
  user:User|any = null

  constructor(private userService:UserService){}

  ngOnInit(): void {

    this.userService.getUserById(this.commentModel.userId).subscribe({
      next: ((response) => { this.user = response}),
      error: ((error) => console.error(error))
    }
    )
  }
}
