import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediataionComponent } from './mediataion.component';

describe('MediataionComponent', () => {
  let component: MediataionComponent;
  let fixture: ComponentFixture<MediataionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediataionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediataionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
