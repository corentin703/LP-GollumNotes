import { TestBed } from '@angular/core/testing';

import { AuthTokenService } from './auth-token.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Storage} from '@ionic/storage';
import {storageMock} from '@/__mocks__/capacitor/storageMock';

describe('AuthTokenService', () => {
  let service: AuthTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: Storage, useValue: storageMock},
      ]
    });
    service = TestBed.inject(AuthTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
