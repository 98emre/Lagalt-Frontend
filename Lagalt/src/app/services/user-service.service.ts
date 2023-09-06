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
  private user:User|any = null

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
            console.log(response)
            this.user = response
            localStorage.setItem("user", JSON.stringify(this.user));
            console.log("This user: " + this.user)
          },
          error: (getError) => {
            // If there's an error in the GET request, make the POST request
            this.http
              .post('http://localhost:8081/api/users/add-user', {}, httpOptions)
              .subscribe({
                next: (postResponse) => {
                  this.user = postResponse
                  localStorage.setItem("user", JSON.stringify(this.user));
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

  // Checks if authenticated via keycloak 
  isAuthenticated(){
    return this.isLoggedIn;
  }

  // get users by search (fullname & username)
  getUserBySearch(searchTerm: string): Observable<User[]>{
    return this.http.get<User[]>(USER_PUBLIC_API_URL + '/search?name=' + searchTerm)
  }

  getUserById(id: number): Observable<User[]>{
    return this.http.get<User[]>(USER_PUBLIC_API_URL + '/' + id);
  }





}
