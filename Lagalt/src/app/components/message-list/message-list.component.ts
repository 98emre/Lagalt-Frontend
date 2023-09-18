import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent {
  user:User|any = null
  receivedMessages: Message[] = [];
  sentMessages: Message[] = [];


  constructor(private router: Router, public messageService: MessageService, public userService:UserService){

  }

  ngOnInit(){
     this.user = JSON.parse(localStorage.getItem('user')!)
     this.messageService.getAllReceivedMessageById(this.user.id).subscribe((messages) => {
      this.receivedMessages = messages;
      console.log("list mo2d ", messages);
        
    });
    
    this.messageService.getAllSentMessageById(this.user.id).subscribe((messages) => {
      this.sentMessages = messages;
      console.log("list mod ", messages);
    });
     
  }

}
