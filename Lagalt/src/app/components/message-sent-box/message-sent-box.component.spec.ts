import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSentBoxComponent } from './message-sent-box.component';

describe('MessageSentBoxComponent', () => {
  let component: MessageSentBoxComponent;
  let fixture: ComponentFixture<MessageSentBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageSentBoxComponent]
    });
    fixture = TestBed.createComponent(MessageSentBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
