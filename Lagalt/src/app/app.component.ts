import { Component } from '@angular/core';
import { LoginService } from './services/login-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lagalt';

  constructor(private loginService: LoginService) {}

  onButtonClick() {
    this.loginService.setElementVisibility(true);
  }
}
