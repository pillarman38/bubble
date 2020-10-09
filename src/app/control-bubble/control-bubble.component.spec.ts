import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlBubbleComponent } from './control-bubble.component';

describe('ControlBubbleComponent', () => {
  let component: ControlBubbleComponent;
  let fixture: ComponentFixture<ControlBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
