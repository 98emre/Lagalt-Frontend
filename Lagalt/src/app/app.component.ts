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
    //console.log("hej")
    //console.log(this.userService.isLoggedIn)
    return this.userService.isAuthenticated();
  }

  onLoginClick() {
    this.userService.keyCloakLogin();
  }
}
