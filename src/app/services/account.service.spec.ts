import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Config} from './config.service.type';
import {RegisterResponse} from './account.service.type';
import {faker} from '@faker-js/faker';
import {ConfigService} from './config.service';
import {of} from 'rxjs';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('AccountService', () => {
  let accountService: AccountService;
  let configServiceSpy: SpyObj<ConfigService>;

  beforeEach(() => {
    configServiceSpy = createSpyObj('ConfigService', ['getConfig']);
    configServiceSpy.getConfig.and.returnValue(
      of<Config>(
        {
          webService: {
            url: 'https://gollum-notes.app'
          }
        }
      )
    );

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        {provide: ConfigService, useValue: configServiceSpy},
        AccountService,
      ]
    }).compileComponents();
    accountService = TestBed.inject(AccountService);
  });

  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(accountService).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it ('should register', () => {
    let response: RegisterResponse;

    const username = faker.internet.userName();
    const password = faker.internet.password();

    accountService.register(username, password).subscribe(_response => response = _response);

    const req = httpTestingController.expectOne('https://gollum-notes.app/auth/register');

    req.flush({
      id: '4f1d9fc1-b7f5-4022-af41-c83e7cdaa785',
      username
    });

    expect(response.username).toEqual(username);
  });
});
