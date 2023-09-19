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
     
  }

  onClickCheckSentMessageBox(){
    this.router.navigate(['/message-box-sent'])
  }

  onClickCheckReceivedMessageBox(){
    this.router.navigate(['/message-box-received'])
  }

  onClickBackToProfile(){
    this.router.navigate(['/profile'])
  }

}
