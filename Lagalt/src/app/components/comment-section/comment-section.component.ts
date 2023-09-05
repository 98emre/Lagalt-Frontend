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
  
  /**
   * ngOnInit()
   * ngOnInit() for the comment section component will make a POST request and save the comments from the database locally.
   * Then ngOnInit() will check for a user in the local storage and set the user as well to be stored locally. 
   */
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
  /**
   * onSubmit()
   * onSubmit() handles the form pertaining to posting a comment, which is only visible and accessible if the user is logged in.
   * The user enters a message through a form and presses the button 'post comment'. 
   * 
   * @param form, a NgForm where the message is recieved onto this function. 
   */
  onSubmit(form:NgForm):void{
    let newComment:ProjectComment = {id:1, author: this.user.username, text: form.value.text, time:"TIME UNKNOWN", projectId:this.projectId}
    this.commentModels.push(newComment)
    this.commentService.postComment(newComment)
  }
}
