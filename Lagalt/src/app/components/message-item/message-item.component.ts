import {Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent {

  @Input() messageModel: Message | any;
  @Input() isUnread: boolean = false;
  receiver: User | any;
  sender: User | any;

 
  constructor(private router: Router, public messageService: MessageService, public userService:UserService){
   
  }

  /**
   * ngOnInit()
   * Gets the recieverUser and the senderUser.
   */
  ngOnInit() {
       this.userService.getUserById(this.messageModel.receiverId).subscribe({
          next: (user) => {
             this.receiver = user;
          }
       })
 
       this.userService.getUserById(this.messageModel.senderId).subscribe({
          next: (user) => {
             this.sender = user;
          }
       })
  }

  /**
   * formatDate()
   * A method that formats the date for a message (similar to comments).
   * @param date, An incoming date type.
   * @returns formattedDateString, a string that is on the format that we want. 
   */
  formatDate(date: string){
   var originalDate = new Date(date);
   var year = originalDate.getFullYear();
   var month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); 
   var day = originalDate.getDate().toString().padStart(2, '0');
   var hours = originalDate.getHours().toString().padStart(2, '0');
   var minutes = originalDate.getMinutes().toString().padStart(2, '0');

   var formattedDateString = `${year}/${month}/${day} ${hours}.${minutes}`;

   return formattedDateString
 }

 /**
  * markAsRead()
  * A method that marks a message as read (no longer highlighted with green) on click.
  */
 markAsRead() {
   if (this.isUnread) {
       // 1. Update the message status locally
       this.messageModel.messageStatus = 'READ';
       this.isUnread = false;
       
       // 2. Update the message status in your service/backend
       this.messageService.updateMessage(this.messageModel.id,this.messageModel)
   }
}

 }