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
  @Input() projectAmount : Number | any;

  editBtnClicked: boolean = false;
  newDescription: string = "";
  newSkills: string[] = [];
  projectIds:number[] = [];
  loggedInUser: User|any = null;

  description: string =  '';

  constructor(private userService : UserService){}

  /**
   * ngOnInit()
   * On init this life cycle hook reads in a user from the local storage.
   */
  ngOnInit(){

    this.loggedInUser = JSON.parse(localStorage.getItem("user")!);

  }

  /**
   * ngOnChanges()
   * When a change occurs to the input variable, then this method is inwoked.
   * The inputted project ids are written to this object's project ids.
   */
  ngOnChanges(){

    if(this.userDetails != null){
      this.projectIds = this.userDetails.projectIds
    }

  }

  /**
   * editBtnVisible()
   * editBtnVisible() is a method that governs the visibility of the edit button to be shown only when
   * editing is possible, i.e, when the user is logged in and authenticated. 
   * @returns 
   */
  editBtnVisible(){

    if(this.loggedInUser!=null && this.userDetails!=null && this.userDetails.id == this.loggedInUser.id){
      return true;
    }else{
      return false;
    }
  }

  /**
   * showEditElem()
   * When a user presses the edit button (and is eligble to do so) divs should appear and drop down.
   */
  showEditElem(){
    if(this.editBtnClicked){
      this.editBtnClicked = false;
    }else if(!this.editBtnClicked){
      this.editBtnClicked = true;
    }
    this.userService.tokenRefresh()
  }

  /**
   * onSubmit()
   * When a user enters in the description or choose skills the form is passed to this function, and here we can extract the data the user want to change.
   * @param form, a NgForm that is passed in with data from the user.
   */

  public onSubmit(form: NgForm): void {
    this.editBtnClicked = false;
    this.newDescription = form.value.desc;
    const skillNames = ['JAVA', 'JAVASCRIPT', 'REACT', 'ANGULAR', 'C'];
    this.newSkills = skillNames.filter(skillName => form.value[skillName]);

    // Checks if description or skills has not been edited, in that case the old values will be inserted. 
    if(form.value.desc == ""){
      this.newDescription = this.userDetails.description;
    }
    if(this.newSkills.length == 0){
      this.newSkills = this.userDetails.skills;
    }

    const updatedUser: Partial<User> = {
      description: this.newDescription,
      skills: this.newSkills,
    }

    this.userDetails.description = this.newDescription;
    this.userDetails.skills = this.newSkills;

    // old code: this.userService.updateUser(this.userDetails.id, updatedUser)
    this.userService.customUpdateUser(this.userDetails.id, updatedUser).subscribe({
      next: (response) => {
        this.userService.getUserById(this.userDetails.id).subscribe({
          next: (userObject) => {
            localStorage.setItem('user', JSON.stringify(userObject))
          }
        })
      }
    })
    this.userService.tokenRefresh()
  }
}
