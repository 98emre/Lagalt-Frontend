import { Component, Input, OnInit } from '@angular/core';
import { ProjectComment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
import { CommentService} from 'src/app/services/comment-service.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit{
  @Input() commentModels:ProjectComment[] | any
  @Input() projectId:number|any
  constructor(private commentService : CommentService){}
  user:User|any = null
  
  ngOnInit(): void {
    this.commentService.getComments().subscribe(
      (comments: ProjectComment[]) => {
        this.commentModels = comments
      }
    )
    
    if(localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user')!) as User
    }
  }

  onSubmit(form:NgForm):void{
    let newComment:ProjectComment = {id:1, name: this.user.username, text: form.value.text, time:"TIME UNKNOWN", projectId:this.projectId}
    this.commentModels.push(newComment)
    this.commentService.postComment(newComment)
  }
}
