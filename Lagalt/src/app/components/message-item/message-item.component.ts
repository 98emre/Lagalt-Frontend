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

  @Input() MessageModel: Message | any;
  receiver: User | any;
  sender: User | any;

 
  constructor(private router: Router, public messageService: MessageService, public userService:UserService){
   
  }

  ngOnInit() {
       console.log(this.MessageModel)
       this.userService.getUserById(this.MessageModel.receiverId).subscribe({
          next: (user) => {
             this.receiver = user;
             console.log(user)
          }
       })
 
       this.userService.getUserById(this.MessageModel.senderId).subscribe({
          next: (user) => {
             this.sender = user;
             console.log(user)
          }
       })
  }
 }