import { ComponentFixture, TestBed } from '@angular/core/testing';

import { chatboxComponent } from './chatbox.component';

describe('chatboxComponent', () => {
  let component: chatboxComponent;
  let fixture: ComponentFixture<chatboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ chatboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(chatboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
