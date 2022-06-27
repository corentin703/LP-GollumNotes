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

  it('should get auth token', async () => {
    const authToken = 'azertyuiop';
    await storageMock.set('authToken', authToken);

    const token = await service.get().toPromise();
    expect(token).toEqual(authToken);
  });

  it('should save auth token', async () => {
    const authToken = 'azertyuiop';
    await service.save(authToken);

    const token = await storageMock.get('authToken');
    expect(token).toEqual(authToken);
  });

  it('should remove authToken', async () => {
    const authToken = 'azertyuiop';
    await storageMock.set('authToken', authToken);

    await service.delete();
    const token = await storageMock.get('authToken');

    expect(token).toBeUndefined();
  });
});
