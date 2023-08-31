import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, tap } from "rxjs";
import { User } from "../models/user";
import keycloak from 'src/keycloak';

@Injectable({
    providedIn: "root"
})

export class UserService {

  public isLoggedIn = false;

  constructor(private readonly http:HttpClient){

    if(keycloak.authenticated){
      this.isLoggedIn = true;
    }
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

  // get user from database
  getUserDetails(): Observable<User> {

    /* TO DO: sending keycloak token */

    //const keyCloakToken = keycloak.token;
    //return this.http.get<User>('/api/verifyOrCreateUser', { headers: { Authorization: `Bearer ${keyCloakToken}` } });

     return this.http.get<User>("http://localhost:8080/api/users/1")
  }

}
