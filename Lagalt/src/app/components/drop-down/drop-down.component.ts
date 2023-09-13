import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent {
  isDropdownOpen = false;

  constructor(private userService: UserService){}

  /**
   * toggleDropdown()
   * Does exactly what the name suggests, sets the dropdown to the negation of whatever truth value
   * it might currently hold.
   */
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  /**
   * onLogOutClick()
   * When the logout button is clicked, the keycloak log out function in userService is called.
   * Also the localStorage is cleared (to prevent bugs).
   */
  onLogOutClick(){
    this.userService.keyCloakLogOut();
    localStorage.removeItem('user');
  }
}
