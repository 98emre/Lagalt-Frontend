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

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(event: Event) {
    if (!(event.target as HTMLElement).classList.contains('dropbtn')) {
      this.isDropdownOpen = false;
    }
  }

  onLogOutClick(){
    this.userService.keyCloakLogOut();
    localStorage.removeItem('user');
  }
}
