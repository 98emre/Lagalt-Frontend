import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-message-sent-box',
  templateUrl: './message-sent-box.component.html',
  styleUrls: ['./message-sent-box.component.scss'],
})
export class MessageSentBoxComponent {
  user: User | any = null;
  receivedMessages: Message[] = [];
  sentMessages: Message[] = [];

  constructor(private router: Router, public messageService: MessageService, public userService: UserService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')!);

    this.messageService.getAllSentMessageById(this.user.id).subscribe((messages) => {
        this.sentMessages = messages;
      });
  }

  onClickBackToProfile(){
    this.router.navigate(["/message-box"])
  }

  onMessageClick(message: Message) {
    this.router.navigate(["/message-detail", message.id]);
  }
  
}
