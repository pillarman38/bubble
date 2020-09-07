import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyQuestionComponent } from './weekly-question.component';

describe('WeeklyQuestionComponent', () => {
  let component: WeeklyQuestionComponent;
  let fixture: ComponentFixture<WeeklyQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
