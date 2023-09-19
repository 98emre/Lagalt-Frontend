import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.scss']
})
export class MessagePageComponent {

  showReceivedMessages: boolean = true;
  showSentMessages: boolean = false;

  constructor(private router: Router){}

  toggleView(){
    if(this.showReceivedMessages){
      this.showReceivedMessages = false;
      this.showSentMessages = true;
      
    }else if(this.showSentMessages){
      this.showSentMessages = false;
      this.showReceivedMessages = true;
    }
  }

  onClickAddMessage(){
    this.router.navigate(['/add-message'])
  }
  

}
