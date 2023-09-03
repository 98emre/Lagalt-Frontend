import { Component, Input } from '@angular/core';
import { ProjectComment } from 'src/app/models/comment';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent {
  @Input() commentModel: ProjectComment | any;
}
