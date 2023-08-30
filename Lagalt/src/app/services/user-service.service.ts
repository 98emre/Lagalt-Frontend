import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user";
import keycloak from 'src/keycloak';

@Injectable({
    providedIn: "root"
})

export class UserService {

  private user! : User | undefined
  public isLoggedIn = false;

  constructor(private readonly http:HttpClient){

    if(keycloak.authenticated){
      this.isLoggedIn = true;
    }
    console.log(keycloak.token);
  }

  // Keycloak login 
  keyCloakLogin(): void {
    keycloak.login();

  }

  // Keycloak logout 
  keyCloakLogOut(): void {
    keycloak.logout();
  }

  isAuthenticated(){
    return this.isLoggedIn;
  }
}
