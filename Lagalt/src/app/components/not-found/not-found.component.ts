import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  constructor(private userService:UserService){}
  ngOnInit(){
    this.userService.tokenRefresh()
  }
}
