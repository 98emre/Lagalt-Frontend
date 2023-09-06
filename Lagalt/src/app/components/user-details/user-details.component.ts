import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  @Input() userDetails: User | any;
  projectIds:number[] = []
  ngOnChanges(){
    if(this.userDetails != null){
      this.projectIds = this.userDetails.projectIds
      console.log(this.projectIds)
    }
  }

}
