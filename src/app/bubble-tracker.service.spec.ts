import { TestBed } from '@angular/core/testing';

import { BubbleTrackerService } from './bubble-tracker.service';

describe('BubbleTrackerService', () => {
  let service: BubbleTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BubbleTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
