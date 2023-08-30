import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent {
  dummyProject:Project = {id:1, name:"Skratthörnan", owner:true, category:"Yo", description:"Yo town, this project thaaa best wazzup."}

}
