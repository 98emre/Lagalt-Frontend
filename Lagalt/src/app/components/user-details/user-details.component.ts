import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  @Input() userDetails: User | any;
  editBtnClicked: boolean = false;

  newDescription: string = "";
  newSkills: string[] = [];

  projectIds:number[] = []

  constructor(private userService : UserService){}

  ngOnChanges(){
    if(this.userDetails != null){
      this.projectIds = this.userDetails.projectIds
    }

  }

  ngOnInit(){
    this.editBtnVisible()
  }

  editBtnVisible(){
    const loggedInUser = JSON.parse(localStorage.getItem('user')!);
    if(this.userDetails.id == loggedInUser.id ){
      return true;
    }else{
      return false;
    }
  }

  showEditElem(){
    this.editBtnClicked = true;
  }

  /**
   * onSubmit()
   * When a user enters in the description or choose skills the form is passed to this function, and here we can extract the data the user want to change.
   * @param form, a NgForm that is passed in with data from the user.
   */

  public onSubmit(form: NgForm): void {
    this.newDescription = form.value.desc;
    const skillNames = ['JAVA', 'JAVASCRIPT', 'REACT', 'ANGULAR', 'C'];
    this.newSkills = skillNames.filter(skillName => form.value[skillName]);

    const updatedUser: Partial<User> = {
      description: this.newDescription,
      skills: this.newSkills,
    }

    this.userService.updateUser(this.userDetails.id, updatedUser)

  }

}
