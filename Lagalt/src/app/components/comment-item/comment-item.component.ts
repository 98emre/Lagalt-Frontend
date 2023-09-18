import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectComment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent {
  @Input() commentModel: ProjectComment | any;
  @Output() removeSignal = new EventEmitter()
  user:User|any = null

  constructor(private commentService:CommentService, public userService:UserService){}

  /**
   * ngOnInit()
   * ngOnInit() is a method / lifecycle hook that is called immediately and it
   * gets the user that is connected to the comment via userId.
   * With the user the comment-item can then populate the HTML.
   */
  ngOnInit(): void {
    if(localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user')!) as User
    } 
  }


  /**
   * formatDate()
   * A method that parses relevant data and formats the date into a format that we want.
   * @param date, An incoming date from a created comment. 
   * @returns formattedDateString, the format that we want the date to be presented as. 
   */

  formatDate(date: string){

    // Parse the original date string into a Date object
    var originalDate = new Date(date);

    // Extract the date components
    var year = originalDate.getFullYear();
    var month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to the month because it's zero-based
    var day = originalDate.getDate().toString().padStart(2, '0');
    var hours = originalDate.getHours().toString().padStart(2, '0');
    var minutes = originalDate.getMinutes().toString().padStart(2, '0');

    // Construct the formatted date string
    var formattedDateString = `${year}/${month}/${day} ${hours}.${minutes}`;

    return formattedDateString
  }

  /**
   * removeComment()
   * A deleteComment HTTP request is made and a subscription is made to it.
   * When the comment is deleted, a remove signal is emitted to the parent that
   * can use that signal to re-render its comment section
   */
  removeComment(){
    this.commentService.deleteComment(this.commentModel).subscribe({
      next:((response) => this.removeSignal.emit())
    })
    this.userService.tokenRefresh()
  }
}
