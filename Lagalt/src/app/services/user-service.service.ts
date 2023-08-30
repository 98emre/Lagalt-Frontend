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

  }

  // Keycloak login 
  keyCloakLogin(): void {
    keycloak.login();

    // checks if authenticated in keycloak
    /*if(keycloak.authenticated){
      this.isLoggedIn = true;
    }*/
  }

  /*getUsers(keyCloakToken: String = ""): Observable<User | null>{
    this.keyCloakToken = keyCloakToken;
    //return this.http.get<User>(`https://api-url/${keyCloakToken}`)
    console.log(keyCloakToken);

    const loggedInUser: User = {
      id: 1, 
      username: "Tore", 
      email: "tore@hotmail.com",
      skills: ["java", "javascript"]
    }
    
    return loggedInUser || null
  }*/

  isAuthenticated(){
    return this.isLoggedIn;
  }
}
