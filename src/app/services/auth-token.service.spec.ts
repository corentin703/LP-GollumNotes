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

  it('should get auth token', (done) => {
    const authToken = 'azertyuiop';

    storageMock.set('authToken', authToken).then(_ => {
      service.get().subscribe(token => {
        expect(token).toEqual(authToken);
        done();
      });
    });
  });

  it('should save auth token', (done) => {
    const authToken = 'azertyuiop';

    service.save(authToken).then(_ => {
      storageMock.get('authToken').then(token => {
        expect(token).toEqual(authToken);
        done();
      });
    });
  });

  it('should remove authToken', (done) => {
    const authToken = 'azertyuiop';

    storageMock.set('authToken', authToken).then(_ => {
      service.delete().then(__ => {
        storageMock.get('authToken').then(token => {
          expect(token).toBeUndefined();
          done();
        });
      });
    });
  });
});
