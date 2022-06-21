import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Storage} from '@ionic/storage';
import {storageMock} from '@/__mocks__/capacitor/storageMock';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        {provide: Storage, useValue: storageMock},
        AuthGuardService,
      ]
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
