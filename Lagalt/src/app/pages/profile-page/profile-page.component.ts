import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  constructor() { }

  ngOnInit(): void {
  }

  dummyName:String = "Mr Brass"
  dummyDescription:String = "I work in retail, I am 45 years old but my humor is that of a 15 year old. My motto: Laugh hard. Die Hard."
  onClickAddProject() {
    alert("profile-page.onClick() was called");
  }
  public onSubmit(form: NgForm): void {
    console.log("Submitted", form.value)
  }
}
