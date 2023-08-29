import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  constructor(private loginService: LoginService) {}

  onExitClick() {
    this.loginService.setElementVisibility(false);
  }

}
