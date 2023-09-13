import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user-service.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  constructor(private router: Router, private userService : UserService) {}

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

    if (this.userService.isAuthenticated()) {
        return true;
      } else {
        console.log("ej inloggad");
        // Redirect to the login page or a designated unauthorized page
        this.router.navigate(['']); // Adjust the route as needed
        return false;
      }
  }
}