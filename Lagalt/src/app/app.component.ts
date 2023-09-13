import { Component } from '@angular/core';
import { UserService } from './services/user-service.service';
import { Router } from '@angular/router';
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

  /**
   * ngOnInit()
   * The ngOnInit() life cycle hook is triggered upon start and immediately it will call the user service to get a user from the API.
   * ngOnInit() also makes a subscription on the user's value so that when it is ready it will be returned and set for app-component.html to use subsequently.
   */
  ngOnInit(){
    this.userService.getUser()
    this.userService.getUserObservable().subscribe((user) => {
      this.userName = user.username;
    });

    if(!this.userService.isAuthenticated()){
      localStorage.removeItem('user');
    }
  }

  /**
   * homeOnClick()
   * A method that returns the user back to the landing page onClick.
   */
  homeOnClick(){
    window.location.href="";
  }

  /**
   * isLoggedIn()
   * @returns, The boolean value pertaining to if the user is logged in or not.
   */
  isLoggedIn(){
    return this.userService.isAuthenticated();
  }

  /**
   * onLoginClick()
   * Trigger the keycloak form onClick.
   */
  onLoginClick() {
    this.userService.keyCloakLogin();
  }
}
