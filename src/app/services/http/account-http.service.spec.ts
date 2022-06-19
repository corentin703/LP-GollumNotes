import { TestBed } from '@angular/core/testing';

import { AccountHttpService } from './account-http.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RegisterResponse} from './account-http.service.type';
import {faker} from '@faker-js/faker';
import {ConfigService} from '../config.service';
import {AuthTokenService} from '@app/services/auth-token.service';
import { storageMock } from '@/__mocks__/capacitor/storageMock';
import {Storage} from '@ionic/storage';
import {configServiceMock, fakeConfig} from '@/__mocks__/services/config-service-mock';
import {Payload} from '@app/services/http/common.type';

describe('AccountHttpService', () => {
  let accountService: AccountHttpService;
  let authTokenService: AuthTokenService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        {provide: Storage, useValue: storageMock},
        {provide: ConfigService, useValue: configServiceMock},
        AccountHttpService,
      ]
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);

    authTokenService = TestBed.inject(AuthTokenService);
    spyOn(authTokenService, 'save').and.returnValue((async () => { })());

    accountService = TestBed.inject(AccountHttpService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(accountService).toBeTruthy();
  });

  it('should register', () => {
    let response: RegisterResponse;

    const username = faker.internet.userName();
    const password = faker.internet.password();

    accountService.register(username, password).subscribe(_response => {
      response = _response.data;
    });

    const req = httpTestingController.expectOne(`${fakeConfig.webService.url}/auth/register`);

    const responseBody: Payload<RegisterResponse> = {
      data: {
        id: '4f1d9fc1-b7f5-4022-af41-c83e7cdaa785',
        username
      }
    };
    req.flush(responseBody);

    expect(response.username).toEqual(username);
  });
});
