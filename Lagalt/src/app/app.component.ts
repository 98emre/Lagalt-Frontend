

import { Component } from '@angular/core';
import { UserService } from './services/user-service.service';
import keycloak from 'src/keycloak';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lagalt';
  userName: String = "";
  user:User|any = null

  constructor(private userService: UserService, private readonly router: Router) {}

  ngOnInit(){
    this.userService.getUser()
    this.userService.getUserObservable().subscribe((user) => {
      this.userName = user.username;
    });
  }

  homeOnClick(){
    window.location.href="";
  }

  isLoggedIn(){
    return this.userService.isAuthenticated();
  }

  onLoginClick() {
    this.userService.keyCloakLogin();
  }
}
