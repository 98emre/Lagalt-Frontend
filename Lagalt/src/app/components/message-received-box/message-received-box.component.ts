import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-message-received-box',
  templateUrl: './message-received-box.component.html',
  styleUrls: ['./message-received-box.component.scss']
})
export class MessageReceivedBoxComponent {

  user:User|any = null
  receivedMessages: Message[] = [];

  constructor(private router: Router, public messageService: MessageService, public userService:UserService){

  }

  ngOnInit(){
     this.user = JSON.parse(localStorage.getItem('user')!)
     this.messageService.getAllReceivedMessageById(this.user.id).subscribe((messages) => {
      this.receivedMessages = messages;
        
    }); 
  }
  
  onClickBackToProfile(){
    return this.router.navigate(["/message-box"]);
  }
}






