import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoSelectorComponent } from './photo-selector.component';

describe('PhotoSelectorComponent', () => {
  let component: PhotoSelectorComponent;
  let fixture: ComponentFixture<PhotoSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
