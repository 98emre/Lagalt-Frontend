import { Component, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent {

  currentUser:User|any
  users: [] |any

  title: string = "";
  text: string = "";

  constructor(private router: Router, public messageService: MessageService, public userService:UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });

    this.currentUser = JSON.parse(localStorage.getItem("user")!);
  }

  onSubmit(form: NgForm):void{
    let newTitle = form.value.title
    let newText = form.value.text
    let receiverId = parseInt(form.value.user);
    let senderId = parseInt(this.currentUser.id);

    let message:Message = {
          id: 1, 
          title: newTitle,
          text: newText,
          date: new Date(),
          messageStatus:"UNREAD",
          receiverId:receiverId,

        }


    this.userService.tokenRefresh()
    console.log(message);

    this.messageService.postMessage(message);


  
    this.router.navigate(['/message-box']);
  }


  onGoBack(){
    this.router.navigate(['/message-box']);
  }

}
