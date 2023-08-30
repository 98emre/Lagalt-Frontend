import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  public loginBtnClicked = false;

  constructor(private loginService: UserService) {}
  
  ngOnInit() {
    
  }

}
