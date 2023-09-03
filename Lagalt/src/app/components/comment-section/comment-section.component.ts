import { Component, Input } from '@angular/core';
import { ProjectComment } from 'src/app/models/comment';


@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent {
  @Input() commentModels:ProjectComment[] | any
  
}
