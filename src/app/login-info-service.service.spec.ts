import { TestBed } from '@angular/core/testing';

import { LoginInfoServiceService } from './login-info-service.service';

describe('LoginInfoServiceService', () => {
  let service: LoginInfoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginInfoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
