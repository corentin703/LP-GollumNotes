import { TestBed } from '@angular/core/testing';

import { AuthTokenService } from './auth-token.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AuthTokenService', () => {
  let service: AuthTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
