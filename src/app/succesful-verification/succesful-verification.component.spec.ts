import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesfulVerificationComponent } from './succesful-verification.component';

describe('SuccesfulVerificationComponent', () => {
  let component: SuccesfulVerificationComponent;
  let fixture: ComponentFixture<SuccesfulVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccesfulVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesfulVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
