import { TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Config} from './config.service.type';

describe('ConfigService', () => {
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    }).compileComponents();
    configService = TestBed.inject(ConfigService);
  });

  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(configService).toBeTruthy();
  });

  it ('shoud get config', () => {
    let config: Config;

    configService.config.subscribe(_config => config = _config);

    const req = httpTestingController.expectOne('assets/config.json');

    req.flush({
      webService: {
        url: 'https://gollum-notes.app/api'
      }
    });

    expect(config.webService.url).toEqual('https://gollum-notes.app/api');
  });
});
