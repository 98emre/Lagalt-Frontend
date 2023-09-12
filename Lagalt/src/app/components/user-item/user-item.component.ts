import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent {

  constructor(private router: Router) { }

  @Input() userModel: User | any;

  /**
   * onGotoClick()
   * When the logged in user clicks on a user item, he is to be navigated to their page.
   * This method takes care of that.
   * @param id, The id of the user page to navigate to.
   */
  onGotoClick(id: number){
    this.router.navigate(['/user', id]);
  }

}
