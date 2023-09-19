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

  ngOnInit() {
       console.log(this.messageModel)
       this.userService.getUserById(this.messageModel.receiverId).subscribe({
          next: (user) => {
             this.receiver = user;
             console.log(user)
          }
       })
 
       this.userService.getUserById(this.messageModel.senderId).subscribe({
          next: (user) => {
             this.sender = user;
             console.log(user)
          }
       })
  }


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

 markAsRead() {
   if (this.isUnread) {
       // Update the message status locally
       this.messageModel.messageStatus = 'READ';
       this.isUnread = false;
       
       // Update the message status in your service/backend
       this.messageService.updateMessage(this.messageModel.id,this.messageModel)
   }
}

 }