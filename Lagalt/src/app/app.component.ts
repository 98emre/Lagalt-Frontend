import { Component } from '@angular/core';
import { UserService } from './services/user-service.service';
import keycloak from 'src/keycloak';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lagalt';
  keycloakToken = "";

  constructor(private userService: UserService, private readonly router: Router) {}

  isLoggedIn(){
    return this.userService.isAuthenticated();
  }

  onLoginClick() {
    this.userService.keyCloakLogin();
  }
}
