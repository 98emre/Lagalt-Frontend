import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { USER_PUBLIC_API_URL } from '../utils';
import { User } from "../models/user";
import keycloak from 'src/keycloak';

@Injectable({
    providedIn: "root"
})

export class UserService {

  public isLoggedIn = false;

  constructor(private readonly http:HttpClient){
    

    if (keycloak.authenticated) {
      this.isLoggedIn = true;
      const keyCloakToken = keycloak.token;
    
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${keycloak.token}`
        })
      };
    
      this.http
        .get('http://localhost:8081/api/users/public/token/username', httpOptions)
        .subscribe({
          next: (response) => {
            // Handle the response from the server here
            console.log('GET request success', response);
          },
          error: (getError) => {
            // If there's an error in the GET request, make the POST request
            this.http
              .post('http://localhost:8081/api/users/add-user', {}, httpOptions)
              .subscribe({
                next: (postResponse) => {
                  // Handle the response from the POST request here
                  console.log('POST request success', postResponse);
                },
                error: (postError) => {
                  // Handle errors from the POST request here
                  console.error('POST request error', postError);
                }
              });
          }
        });
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
    //return this.http.post<User>('/api/verifyOrCreateUser', { headers: { Authorization: `Bearer ${keyCloakToken}` } });

     return this.http.get<User>(USER_PUBLIC_API_URL + "/2")
  }

  // Requests user by fullname 
  /* TO DO: request users by username */
  getUsersBySearch(name: string): Observable<User[]>{
    return this.http.get<User[]>(USER_PUBLIC_API_URL + '/search?name=' + name)
  }

}
