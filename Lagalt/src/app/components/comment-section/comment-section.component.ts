import { Component, Input, OnInit } from '@angular/core';
import { ProjectComment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
import { CommentService} from 'src/app/services/comment-service.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent {
  @Input() projectId:number|any
  constructor(private userService:UserService, private commentService : CommentService){}
  user:User|any = null
  commentModels:ProjectComment[] = []
  

  /**
   * ngOnInit()
   * The ngOnInit life cycle hook creates a subscription for the user, from the user service. This makes it so that the
   * data can be used immediately after the userService is done with reading in its values. 
   */

  ngOnInit(){
    this.userService.getUserObservable().subscribe((user) => { this.user = user });
  }

  /**
   * ngOnChanges()
   * ngOnChanges() for the comment section component will make a GET request and save the comments from the database locally.
   * Then ngOnChanges() will also check for a user in the local storage and set the user as well to be stored locally.
   * The ngOnChanges lifecycle hook is used rather than ngOnInit to resolve the issue pertaining to order of reading in data.
   * For example, onInit can be called before the input to the projectId is passed, but with ngOnChanges the function is called 
   * again when the input is passed down and the projectId (That due to the timing was null) is corrected for. 
   */

  ngOnChanges(): void {

    this.commentService.getComments().subscribe(
      (comments: ProjectComment[]) => {
        this.commentModels = comments.filter((element) => element.projectId === this.projectId)
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
   * This function is invoked to handle that, basically extracting the fields the user had and insert them into a comment that is
   * later posted in commentService.
   * 
   * @param form, a NgForm where the message is recieved onto this function. 
   */
  onSubmit(form:NgForm):void{
    let commentDate = new Date()
    let newComment:ProjectComment = {id:1, text: form.value.text, date:commentDate, projectId:this.projectId, userId:this.user.id}
    this.commentModels.push(newComment)
    this.commentService.postComment(this.projectId, newComment)
  }
}
