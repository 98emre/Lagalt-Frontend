import { Component } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  public loginBtnClicked = false;

  constructor(private loginService: UserService, private apiHandler:ApiHandlerService) {}
  ngOnInit(): void {
    let list = this.apiHandler.getProjects()
    console.log(list)
  }


}
