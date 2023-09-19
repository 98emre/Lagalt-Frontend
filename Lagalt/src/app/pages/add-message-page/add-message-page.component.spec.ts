import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMessagePageComponent } from './add-message-page.component';

describe('AddMessagePageComponent', () => {
  let component: AddMessagePageComponent;
  let fixture: ComponentFixture<AddMessagePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMessagePageComponent]
    });
    fixture = TestBed.createComponent(AddMessagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
