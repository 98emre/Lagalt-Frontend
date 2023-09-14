import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedCollaboratorItemComponent } from './accepted-collaborator-item.component';

describe('AcceptedCollaboratorItemComponent', () => {
  let component: AcceptedCollaboratorItemComponent;
  let fixture: ComponentFixture<AcceptedCollaboratorItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptedCollaboratorItemComponent]
    });
    fixture = TestBed.createComponent(AcceptedCollaboratorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
