import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CollaboratorService } from 'src/app/services/collaborator-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-accepted-collaborator-item',
  templateUrl: './accepted-collaborator-item.component.html',
  styleUrls: ['./accepted-collaborator-item.component.scss']
})
export class AcceptedCollaboratorItemComponent {
  constructor(private userService:UserService, private collaboratorService:CollaboratorService){}
  @Input() acceptedCollaborator:any = null
  @Output() removeSignal = new EventEmitter()
  onClick(){
    this.userService.tokenRefresh()
    this.collaboratorService.customDeleteCollaboratorOnId(this.acceptedCollaborator.collaboratorId).subscribe({
      next: () => {
        console.log("Delete operation completed");
      },
      error: (error) => {
        console.error("Delete operation failed:", error);
        // Handle the error appropriately, e.g., show a message to the user.
      },
      complete: () => {
        this.removeSignal.emit();
        this.userService.tokenRefresh();
      }
    })
  }
}
