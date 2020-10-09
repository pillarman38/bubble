import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerenityBubbleComponent } from './serenity-bubble.component';

describe('SerenityBubbleComponent', () => {
  let component: SerenityBubbleComponent;
  let fixture: ComponentFixture<SerenityBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerenityBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerenityBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
