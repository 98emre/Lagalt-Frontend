import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  public loginBtnClicked = false;

  constructor(private loginService: LoginService) {}
  
  ngOnInit() {
    this.loginService.getElementVisibility().subscribe((visibility) => {
      this.loginBtnClicked = visibility;
    });
  }

}
