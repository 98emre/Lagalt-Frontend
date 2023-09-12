import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject} from "rxjs";
import { USER_PRIVATE_API_URL, USER_PUBLIC_API_URL } from '../utils';
import { User } from "../models/user";
import keycloak from 'src/keycloak';

@Injectable({
    providedIn: "root"
})

export class UserService {

  public isLoggedIn = false;
  private user:User|any = null
  private userSubject = new Subject<any>
  constructor(private readonly http:HttpClient){
    this.tokenRefresh();
  }

  /**
   * getUser()
   * getUser() is a method that uses the generated keycloak token to try to find a user.
   * It will send a request to the backend, if that request succeeds, that means we are
   * logging in as an existing user. If the first call fails, possibly due to error code
   * 404, (resource can't be found), then this function attempts to create a user via the
   * add-user API url instead. In a sentence, the function:
   * 1. Tries to find a user,
   * 2. Creates a user if unable to find it.
   * 
   * Moreover, the get user function also sets an internal userSubject so that it is set
   * when a user (either created or found) exists. A function outside can then subscribe
   * to this value so that they can wait for the async operations to take their course and
   * then to have the corresponding user value being set and emitted to them. 
   * (To avoid timing errors)
   */
  getUser(){
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
          this.user = response
          localStorage.setItem("user", JSON.stringify(this.user));
          this.userSubject.next(response)
        },
        error: (getError) => {
          // If there's an error in the GET request, make the POST request
          this.http
            .post('http://localhost:8081/api/users/add-user', {}, httpOptions)
            .subscribe({
              next: (postResponse) => {
                this.user = postResponse
                localStorage.setItem("user", JSON.stringify(this.user));
                this.userSubject.next(postResponse)
                // Handle the response from the POST request here
                console.log('POST request success', postResponse);
              },
              error: (postError) => {
                // Handle errors from the POST request here
                console.log('POST request error', postError);
              }
            });
        }
      });
    }
  }
  
  /**
   * getUserObservable()
   * getUserObservable is a method that extends the getUser() functionality.
   * This method is simply a getter for the subject that can be subscribed to and that
   * sets a value in getUser(). The subscription makes it so methods outside of this
   * class can obtain the user value the moment that it is available (avoid timing errors).
   * @returns An observable, pertaining to user. 
   */

  getUserObservable(){
    return this.userSubject.asObservable()
  }

  /**
   * keyCloakLogin()
   * Triggers the keyCloak login form.
   */
  keyCloakLogin(): void {
    keycloak.login();
  }

  /**
   * keyCloakLogOut()
   * Logs out an authenticated user from key cloak.
   */ 
  keyCloakLogOut(): void {
    keycloak.logout();
  }

  /**
   * isAuthenticated()
   * @returns The boolean value for if the current user is authenticated.
   */
  isAuthenticated(){
    return this.isLoggedIn;
  }

  /**
   * getUserBySearch()
   * A method that does a HTTP request to the backend, which in turn returns a 
   * LIKE query.
   * @param searchTerm, The search term used for the query. 
   * @returns An observable for functions outside the service to subscribe to.
   */
  getUserBySearch(searchTerm: string): Observable<User[]>{
    return this.http.get<User[]>(USER_PUBLIC_API_URL + '/search?name=' + searchTerm)
  }

  /**
   * getAllUsers()
   * A method that does a HTTP request to the backend to get every user.
   * @returns An observable on all users.
   */
  getAllUsers(){
    return this.http.get<User[]>(USER_PUBLIC_API_URL)
  }

  /**
   * getUserById()
   * A method that acquires a specific user, on an ID passed as an URL.
   * @param id 
   * @returns An observable pertaining to a specific user.  
   */
  getUserById(id: number): Observable<User>{
    return this.http.get<User>(USER_PUBLIC_API_URL + '/' + id);
  }

  /**
   * updateUser()
   * A method that does an update HTTP request.
   * @param id 
   * @param user 
   */
  updateUser(id: number, user: Partial<User>){
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${keycloak.token}` 
      }),
    };
    this.http
    .patch<User>(USER_PRIVATE_API_URL + '/' + id, user, httpOptions)
    .subscribe({
      error: (error) => {console.log(error)}
    });
  }


  /**
   * tokenRefresh()
   * A method that updates the keycloak Token.
   */

  private tokenRefresh(): void {
    keycloak.onTokenExpired = () => {
      keycloak.updateToken(30).then(refreshed => {
        if (!refreshed) {
          console.error('Token not refreshed, maybe the session has expired?');
          this.isLoggedIn = false;
      
          // Gör så att man hamnar på login sidan om den inte refreshar
        
      } else {
          this.isLoggedIn = true;
        }
      }).catch(() => {
        console.error('Failed to refresh the token, or the session has expired');
      });
    };
  }



}
