import { TestBed } from '@angular/core/testing';

import { LoginInfoService } from './login-info-service.service';

describe('LoginInfoServiceService', () => {
  let service: LoginInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
