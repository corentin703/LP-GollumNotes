import { TestBed } from '@angular/core/testing';

import { AccountHttpService } from './account-http.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Config} from '../config.service.type';
import {RegisterResponse} from './account-http.service.type';
import {faker} from '@faker-js/faker';
import {ConfigService} from '../config.service';
import {of} from 'rxjs';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import {HttpClient} from '@angular/common/http';
import {AuthTokenService} from '@app/services/auth-token.service';
import {StorageService} from '@app/services/storage.service';
import { storageMock } from '@/__mocks__/@capacitor/storageMock';

describe('AccountHttpService', () => {
  let accountService: AccountHttpService;
  let authTokenService: AuthTokenService;
  let storageService: StorageService;
  let configService: ConfigService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        {provide: HttpClient, useValue: httpTestingController},
        {provide: ConfigService, useValue: configService},
        AccountHttpService,
      ]
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    configService = TestBed.inject(ConfigService);

    storageService = new StorageService(storageMock);
    authTokenService = new AuthTokenService(storageService);

    spyOn(configService, 'getConfig').and.returnValue(of(
      {
        webService: {
          url: 'https://gollum-notes.app'
        }
      }
    ));

    spyOn(authTokenService, 'save').and.returnValue((async () => { })());

    accountService = new AccountHttpService(
      configService,
      TestBed.inject(HttpClient),
      authTokenService
    );
  });

  it('should be created', () => {
    expect(accountService).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should register', () => {
    let response: RegisterResponse;

    const username = faker.internet.userName();
    const password = faker.internet.password();

    accountService.register(username, password).subscribe(_response => response = _response.data);

    const req = httpTestingController.expectOne('https://gollum-notes.app/auth/register');

    req.flush({
      id: '4f1d9fc1-b7f5-4022-af41-c83e7cdaa785',
      username
    });

    expect(response.username).toEqual(username);
  });
});
