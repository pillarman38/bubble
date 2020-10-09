import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneThirdComponent } from './one-third.component';

describe('OneThirdComponent', () => {
  let component: OneThirdComponent;
  let fixture: ComponentFixture<OneThirdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneThirdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
