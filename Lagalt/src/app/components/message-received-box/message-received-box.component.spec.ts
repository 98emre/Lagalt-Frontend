import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageReceivedBoxComponent } from './message-received-box.component';

describe('MessageReceivedBoxComponent', () => {
  let component: MessageReceivedBoxComponent;
  let fixture: ComponentFixture<MessageReceivedBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageReceivedBoxComponent]
    });
    fixture = TestBed.createComponent(MessageReceivedBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
