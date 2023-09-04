import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { USER_API_URL } from '../utils';
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

     return this.http.get<User>(USER_API_URL + "/1")
  }

  // Requests user by fullname 
  /* TO DO: request users by username */
  getUsersBySearch(name: string): Observable<User[]>{
    return this.http.get<User[]>(USER_API_URL + '/search?name=' + name)
  }

}
