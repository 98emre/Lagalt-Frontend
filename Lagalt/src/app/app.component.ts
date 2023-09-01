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

  constructor(private userService: UserService, private readonly router: Router) {}

  ngOnInit(){
    if(this.userService.isAuthenticated()){
      this.userService.getUserDetails().subscribe((user) => {
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
      })
    }
    
  }

  isLoggedIn(){
    return this.userService.isAuthenticated();
  }

  onLoginClick() {
    this.userService.keyCloakLogin();
  }
}
