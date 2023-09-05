import { Component, Input, OnInit } from '@angular/core';
import { ProjectComment } from 'src/app/models/comment';
import { ProjectService } from 'src/app/services/project-service.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit{
  // Input: Reads in the data content of a project (a model):
  @Input() commentModel: ProjectComment | any;
  constructor(){}
  ngOnInit(): void {
  }
}
