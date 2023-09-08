import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorItemComponent } from './collaborator-item.component';

describe('CollaboratorItemComponent', () => {
  let component: CollaboratorItemComponent;
  let fixture: ComponentFixture<CollaboratorItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollaboratorItemComponent]
    });
    fixture = TestBed.createComponent(CollaboratorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
