import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BFComponent } from './bf.component';

describe('BFComponent', () => {
  let component: BFComponent;
  let fixture: ComponentFixture<BFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
